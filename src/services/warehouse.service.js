
const { WarehouseModels, OrderedModels, CompanyModels, StockModels, sequelize, CertificateAndPassportModels } = require('../../models');
const { Op, QueryTypes } = require('sequelize');
const InsufficientError = require('../exceptions/insufficient_exceptions.');

const s3 = require('../storage/storage');

const path = require('path');

class WarehouseQueries {
    static selectQuery() {
        const query = `select "WarehouseModels".id,"WarehouseModels".document,"WarehouseModels".material_name,
        "WarehouseModels".type,"WarehouseModels".qty,"WarehouseModels".unit,"WarehouseModels".price,
        "WarehouseModels".currency,"WarehouseModels".po,"WarehouseModels"."orderedId","WarehouseModels"."companyId","WarehouseModels"."createdAt" as date,
        "WarehouseModels".certificate, "WarehouseModels".passport, "WarehouseModels".leftover,
        InitCap("CompanyModels".company_name) as company_name,
        INITCAP(CONCAT("OrderedModels"."firstName", ' ', "OrderedModels"."lastName")) as username,
        "MaterialCodeModels".material_code, INITCAP("MaterialCodeModels".material_description) as material_description
        from "WarehouseModels" 
        left join "CompanyModels" on "CompanyModels".id = "WarehouseModels"."companyId"
        left join "OrderedModels" on "OrderedModels".id = "WarehouseModels"."orderedId" 
        left join "MaterialCodeModels" on "MaterialCodeModels".id = "WarehouseModels"."materialCodeId"`;
        return query;
    }
}

class ReceiveWarehouseService {
    static async receiveMaterial(data) {
        try {
            await this.checkEnteringData(data);
            for (let i of data) {
                await WarehouseModels.create({
                    ...i,
                    leftover: i.qty,
                    materialCodeId: i.material_code_id,
                    document: i.document.trim(),
                    material_name: i.material_name.trim(),
                    po: i.po.trim(),
                });
            }
            return true;
        }
        catch (err) {
            throw new Error(err);
        }
    }

    static async checkEnteringData(data) {
        for (let i of data) {
            await WarehouseModels.build({
                ...i,
                leftover: i.qty,
                materialCodeId: i.material_code_id,
                document: i.document.trim(),
                material_name: i.material_name.trim(),
                po: i.po.trim(),
            })
        }
    }

}

class FetchWarehouseDataService {
    static async fetchWarehouseData(projectId) {
        const select_query = WarehouseQueries.selectQuery();
        const query = `${select_query} 
        where "WarehouseModels"."projectId"=${projectId}
        order by "WarehouseModels"."createdAt" asc`
        const respond = await sequelize.query(query)
        return respond[0];
    }

    static async getTypeCount(projectId) {
        let data = [];
        const query = `select type, count(qty) from "WarehouseModels" where "projectId"=${projectId} group by type`;
        const respond = await sequelize.query(query);
        let total = 0;
        if (respond[0]) {
            // Sum all counts;
            for (let i of respond[0]) {
                total += Number(i.count);
                // data.push(i);
            }
            for (let i of respond[0]) {
                i.count = Math.floor(i.count * 100 / total);
                data.push(i);
            }

        }
        return data;
    }
}

class GetPOWarehouseService {
    static async getPOById(id) {
        const respond = await WarehouseModels.findByPk(id,
            {
                include: [
                    {
                        model: CompanyModels,
                        attributes: [['id', 'company_id'], 'company_name']
                    },
                    {
                        model: OrderedModels,
                        attributes: [['id', 'ordered_id'], 'firstName', 'lastName']
                    },
                ]
            }
        );
        return respond;
    }
}

class UpdatePOWarehouseService {
    static async updatePo(id, data) {
        if (!data.qty) {
            throw InsufficientError.inSufficientError('Invalid Quantity, Enter a number');
        }
        else if (data.qty < 0) {
            throw InsufficientError.inSufficientError('Invalid Quantity');
        }
        const respond = await WarehouseModels.findByPk(id);
        if (data.qty > respond.qty) {
            respond.leftover += data.qty - respond.qty;
        }
        else if (data.qty < respond.qty) {
            if (respond.leftover - (respond.qty - data.qty) >= 0) {
                respond.leftover -= respond.qty - data.qty;
            } else {
                throw InsufficientError.inSufficientError('Not enough leftover in stock');
            }
        }
        respond.companyId = data.companyId;
        respond.orderedId = data.orderedId;
        respond.document = data.document;
        respond.material_name = data.material_name;
        respond.type = data.type;
        respond.po = data.po;
        respond.qty = data.qty;
        respond.unit = data.unit;
        respond.price = data.price
        await respond.save();
        const result = await UpdatePOWarehouseService.returnUpdateData(id);
        return result;
    }

    static async returnUpdateData(id) {
        const select_query = WarehouseQueries.selectQuery();
        const query = `${select_query} 
        where "WarehouseModels".id = ${id}
        order by "WarehouseModels"."createdAt" asc`
        const respond = await sequelize.query(query);
        return respond[0][0];
    }

    static async updateCertOrPassportById(data) {
        // 1 - Find Item with id
        const finded_data = await WarehouseModels.findByPk(data.id);
        if (finded_data) {
            if (data.key === 'certificate') {
                finded_data.certificate = !data.value;
            }
            else if (data.key === 'passport') {
                finded_data.passport = !data.value;
            }
        }
        await finded_data.save();
        return finded_data;
    }

}

class FilterWarehouseDataService {
    static async filterWarehouseData(data) {
        const query = this.convertToSql(data);
        const respond = await sequelize.query(query, {  });
        console.log('respond is : ', respond);
        return respond[0];
    }

    static convertToSql(data) {
        let query = `select "WarehouseModels".id,"WarehouseModels".document,"WarehouseModels".material_name,
        "WarehouseModels".type,"WarehouseModels".qty,"WarehouseModels".unit,"WarehouseModels".price,
        "WarehouseModels".currency,"WarehouseModels".po,"WarehouseModels"."orderedId","WarehouseModels"."companyId","WarehouseModels"."createdAt" as date,
        "WarehouseModels".certificate, "WarehouseModels".passport, "WarehouseModels".leftover, 
        InitCap("CompanyModels".company_name) as company_name,
        INITCAP(CONCAT("OrderedModels"."firstName", ' ', "OrderedModels"."lastName")) as username,
        "MaterialCodeModels".material_code, INITCAP("MaterialCodeModels".material_description) as material_description`;
        query += ` from "WarehouseModels" 
        left join "CompanyModels" on "CompanyModels".id = "WarehouseModels"."companyId"
        left join "OrderedModels" on "OrderedModels".id = "WarehouseModels"."orderedId" 
        left join "MaterialCodeModels" on "MaterialCodeModels".id = "WarehouseModels"."materialCodeId"
        `

        let where_query = ' where ';
        for (let [key, value] of Object.entries(data)) {
            if (key === 'material_name') {
                where_query += `"${key}" ILIKE '%${value}%'  and `
            }
            else if (key === 'createdAt') {
                where_query += `"WarehouseModels"."${key}"::date='${value}'  and `
            }
            else if (key === 'projectId') {
                where_query += `"WarehouseModels"."${key}"='${value}'  and `
            }
            else {
                where_query += `"${key}"='${value}'  and `
            }
        }
        if (where_query.length > 6) {
            where_query = where_query.slice(0, where_query.length - 6);
        }
        else {
            where_query = where_query.slice(0, where_query.length - 4);
        }
        query += where_query;
        query += ' order by "WarehouseModels"."createdAt" asc'
        return query;
    }

}

class FetchSelectedItemsService {
    static async fetchSelectedItemsById(data) {
        let selected_datas = [];
        for (let i of data) {
            const result = await this.getPoWithId(i);
            selected_datas.push(result);
        }
        return selected_datas;
    }

    // Find PO with id;
    static async getPoWithId(id) {
        const result = await WarehouseModels.findByPk(id);
        return result;
    }

}

class ReceiveToStockService {
    static async receiveToStock(data) {
        const result = await this.testEnteringAmount(data);
        if (result) {
            await this.updateAndCreateStock(data);
            const result = await this.getPostedData(data);
            return result;
        }

    }

    static async getPoWithIdAndUpdate(id) {
        const result = await WarehouseModels.findByPk(id);
        return result;
    }

    static async testEnteringAmount(data) {
        let cond = true;
        let count = 0;
        for (let i of data) {
            if (!i.entered_amount) {
                throw new Error('Please enter amount in ' + count + ' row');
            }
            count++;
            const result = await this.getPoWithIdAndUpdate(i.id);
            if (result.leftover - Number(i.entered_amount) < 0) {
                throw new Error('Not enough stock in ' + count + ' row');
            }
        }
        return cond;
    }

    static async updateAndCreateStock(data) {

        try {
            for (let i of data) {
                const result = await this.getPoWithIdAndUpdate(i.id);
                if (result.leftover - Number(i.entered_amount) >= 0) {
                    result.leftover = result.leftover - Number(i.entered_amount);
                    const new_stock = await StockModels.create({
                        qty: i.entered_amount,
                        stock: i.entered_amount,
                        price: i.price,
                        serial_number: i.serial_number,
                        material_id: i.material_id,
                        warehouseId: i.id,
                        createdById: data.userId
                    })
                    await result.save();
                }
                else {
                    console.log('enter else');
                }
            }
        }
        catch (err) {
            throw new Error('Add Stock Data Error : ', err);
        }
    }

    static async getPostedData(data) {
        const select_query = WarehouseQueries.selectQuery();
        const returned_data = [];
        for (const i of data) {
            const query = `${select_query} where "WarehouseModels".id = ${i.id}`;
            const respond = await sequelize.query(query);
            returned_data.push(respond[0][0]);
        }
        return returned_data;
    }

}

class UploadCertificateOrPassportService {

    static async uploadCertificateOrPassport(data, file) {

        let upload = await s3.Upload(
            {
                buffer: file.buffer,
            },
            '/certificates_and_passports/'
        );

        const result = await CertificateAndPassportModels.create({
            filename: file.originalname,
            location: upload.Location,
            warehouseId: data.row_id,
            createdById: data.userId
        })

        return upload.Location;

    }

}

class FetchCertificateOrPassportService {
    static async fetchCertificatesOrPassports(warehouseId) {

        const result = await CertificateAndPassportModels.findAll({
            attributes: ['id', 'filename', 'location'],
            where: {
                warehouseId
            }
        })
        return result;
    }
}

module.exports = {
    ReceiveWarehouseService,
    FetchWarehouseDataService,
    GetPOWarehouseService,
    UpdatePOWarehouseService,
    FilterWarehouseDataService,
    FetchSelectedItemsService,
    ReceiveToStockService,
    UploadCertificateOrPassportService,
    FetchCertificateOrPassportService
}