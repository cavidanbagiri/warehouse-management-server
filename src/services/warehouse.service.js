
const { WarehouseModels, UserModels, CompanyModels, StockModels, sequelize } = require('../../models');

class ReceiveWarehouseService {
    static async receiveMaterial(data) {
        for (let i of data) {
            await WarehouseModels.create({
                ...i,
                leftover: i.qty
            });
        }
        return data;
    }
}

class FetchWarehouseDataService {
    static async fetchWarehouseData() {
        const query = `select "WarehouseModels".id,"WarehouseModels".document,"WarehouseModels".material_name,
        "WarehouseModels".type,"WarehouseModels".qty,"WarehouseModels".unit,"WarehouseModels".price,
        "WarehouseModels".currency,"WarehouseModels".po,"WarehouseModels"."orderedId","WarehouseModels"."companyId","WarehouseModels"."createdAt" as date,
        "WarehouseModels".certificate, "WarehouseModels".passport, "WarehouseModels".leftover,
        "CompanyModels".company_name,
        "UserModels"."firstName", "UserModels"."lastName"
        from "WarehouseModels" 
        left join "CompanyModels" on "CompanyModels".id = "WarehouseModels"."companyId"
        left join "UserModels" on "UserModels".id = "WarehouseModels"."orderedId" 
        order by "WarehouseModels"."createdAt" asc`
        const respond = await sequelize.query(query)
        return respond[0];
    }

    static async getTypeCount() {
        let data = [];
        const query = 'select type, count(qty) from "WarehouseModels" group by type';
        const respond = await sequelize.query(query);
        let total = 0;
        if (respond[0]) {
            // Sum all counts;
            for (let i of respond[0]) {
                total+=Number(i.count);
                // data.push(i);
            }
            for (let i of respond[0]) {
                i.count = Math.floor(i.count * 100 / total);
                data.push(i);
            }

        }
        console.log(total)
        console.log('data : ', data);
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
                        attributes: [['id', 'company_id'],'company_name']
                    },
                    {
                        model: UserModels,
                        attributes: [['id', 'user_id'],'firstName', 'lastName']
                    },
                ]
            }
        );
        return respond;
    }
}

class UpdatePOWarehouseService {
    static async updatePo(id, data) {
        const respond = await WarehouseModels.findByPk(id);
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
        return respond;
    }

    static async updateCertOrPassportById(data) {
        // 1 - Find Item with id
        const finded_data = await WarehouseModels.findByPk(data.id);
        if(finded_data) {
            if(data.key === 'certificate'){
                finded_data.certificate = !data.value;
            }
            else if(data.key === 'passport'){
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
        const respond = await sequelize.query(query);
        return respond[0];
    }

    static convertToSql(data) {
        let query = `select "WarehouseModels".id,"WarehouseModels".document,"WarehouseModels".material_name,
        "WarehouseModels".type,"WarehouseModels".qty,"WarehouseModels".unit,"WarehouseModels".price,
        "WarehouseModels".currency,"WarehouseModels".po,"WarehouseModels"."orderedId","WarehouseModels"."companyId","WarehouseModels"."createdAt" as date,
        "WarehouseModels".certificate, "WarehouseModels".passport, "WarehouseModels".leftover, 
        "CompanyModels".company_name,
        "UserModels"."firstName", "UserModels"."lastName"`;
        
        query += ` from "WarehouseModels" 
        left join "CompanyModels" on "CompanyModels".id = "WarehouseModels"."companyId"
        left join "UserModels" on "UserModels".id = "WarehouseModels"."orderedId"
        `

        let where_query = ' where ';
        for (let [key, value] of Object.entries(data)) {
            if(key === 'material_name'){
                where_query += `"${key}" ILIKE '%${value}%'  and `
            }
            else if(key === 'createdAt'){
                where_query += `"WarehouseModels"."${key}"::date='${value}'  and `
            }
            else{
                where_query += `"${key}"='${value}'  and `
            }
        }
        if(where_query.length > 6){
            where_query = where_query.slice(0, where_query.length - 6);
        }
        else{
            where_query = where_query.slice(0, where_query.length - 4);
        }
        query += where_query;
        query += ' order by "WarehouseModels"."createdAt" asc'
        console.log('qeury : ', query);
        return query;
    }

}

class FetchSelectedItemsService {
    static async fetchSelectedItemsById(data) {
        let selected_datas = [];
        for(let i of data){
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

class ReceiveToStockService{
    static async receiveToStock(data) {
        console.log('coming data : ', data);
        const result = await this.testEnteringAmount(data);
        if(result){
            console.log('if Warehouse service : ', result)
            await this.updateAndCreateStock(data);
            return true;
        }
        else{
            console.log('else Warehouse service : ', result)
            return false;
        }
    }

    static async getPoWithIdAndUpdate(id) {
        const result = await WarehouseModels.findByPk(id);
        return result;
    }

    static async testEnteringAmount(data) {
        let cond = true;
        for(let i of data){
            const result = await this.getPoWithIdAndUpdate(i.id);
            if(result.leftover - Number(i.entered_amount) < 0){
                cond = false;
                return cond;
            }
        }
        return cond;
    }

    static async updateAndCreateStock (data) {
        for(let i of data){
            const result = await this.getPoWithIdAndUpdate(i.id);
            if(result.leftover - Number(i.entered_amount) >= 0){
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
            else{
                console.log('enter else');
            }
        }
    }

}

module.exports = {
    ReceiveWarehouseService,
    FetchWarehouseDataService,
    GetPOWarehouseService,
    UpdatePOWarehouseService,
    FilterWarehouseDataService,
    FetchSelectedItemsService,
    ReceiveToStockService
}