
const { StockModels, sequelize, WarehouseModels,  AreaModels, UnusableMaterialModels } = require('../../models');

const InsufficientError = require('../exceptions/insufficient_exceptions.');

class StockQueries {
    static selectQuery (){
        const query =  `select "StockModels".id, "StockModels".qty, "StockModels".stock, "StockModels".serial_number,"StockModels".material_id,
        "WarehouseModels".document, "WarehouseModels".material_name, "WarehouseModels".type,"WarehouseModels".unit,"WarehouseModels".price,
        "WarehouseModels".currency,"WarehouseModels".po,"WarehouseModels"."orderedId","WarehouseModels"."companyId",
        "WarehouseModels"."createdAt" as date,
        INITCAP(CONCAT("OrderedModels"."firstName", ' ', "OrderedModels"."lastName")) as username,
        InitCap("GroupModels".group_name) as group_name,
        InitCap("CompanyModels".company_name) as company_name,
        "MaterialCodeModels".material_code, INITCAP("MaterialCodeModels".material_description) as material_description
        from "StockModels"
        left join "WarehouseModels" on "StockModels"."warehouseId" = "WarehouseModels".id
        left join "CompanyModels" on "CompanyModels".id = "WarehouseModels"."companyId"
        left join "OrderedModels" on "OrderedModels".id = "WarehouseModels"."orderedId"
        left join "GroupModels" on "OrderedModels"."groupId" = "GroupModels".id
        left join "MaterialCodeModels" on "MaterialCodeModels".id = "WarehouseModels"."materialCodeId"
        `
        return query;
    }

}

class FetchStockService {

    static async getStocks(projectId) {
        const select_query = StockQueries.selectQuery();
        const query = `${select_query} 
        where "WarehouseModels"."projectId"=${projectId}
        order by "StockModels"."createdAt" asc`;
        const respond = await sequelize.query(query)
        return respond[0];
    }

}

class FilterStockDataService {
    static async filterStockData(data) {
        const query = this.convertToSql(data);
        const respond = await sequelize.query(query);
        return respond[0];
    }

    static convertToSql(data) {
        let query = `select "StockModels".id, "StockModels".qty, "StockModels".stock, "StockModels".serial_number,"StockModels".material_id,
        "WarehouseModels".document, "WarehouseModels".material_name, "WarehouseModels".type,"WarehouseModels".unit,"WarehouseModels".price,
        "WarehouseModels".currency,"WarehouseModels".po,"WarehouseModels"."orderedId","WarehouseModels"."companyId",
        "WarehouseModels"."createdAt" as date,
        INITCAP(CONCAT("OrderedModels"."firstName", ' ', "OrderedModels"."lastName")) as username,
        InitCap("GroupModels".group_name) as group_name,
        InitCap("CompanyModels".company_name) as company_name,
        "MaterialCodeModels".material_code, INITCAP("MaterialCodeModels".material_description) as material_description
        `;

        query += ` from "StockModels" 
        left join "WarehouseModels" on "StockModels"."warehouseId" = "WarehouseModels".id
        left join "CompanyModels" on "CompanyModels".id = "WarehouseModels"."companyId"
        left join "OrderedModels" on "OrderedModels".id = "WarehouseModels"."orderedId" 
        left join "GroupModels" on "OrderedModels"."groupId" = "GroupModels".id
        left join "MaterialCodeModels" on "MaterialCodeModels".id = "WarehouseModels"."materialCodeId"
        `

        let where_query = ' where ';
        for (let [key, value] of Object.entries(data)) {
            if (key === 'material_name') {
                where_query += `"${key}" ILIKE '%${value}%'  and `
            }
            else if (key === 'createdAt') {
                where_query += `"StockModels"."${key}"::date='${value}'  and `
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
        query += ' order by "StockModels"."createdAt" asc'
        return query;
    }

}

class GetByIdService {

    static async getById(id) {
        const respond = await StockModels.findByPk(id,
            {
                attributes: ['id', 'qty', 'stock', 'price', 'serial_number', 'material_id'],
                include: [
                    {
                        model: WarehouseModels,
                        attributes: [['id', 'warehouse_id'], 'material_name', 'unit']
                    },
                ]
            }
        );
        return respond;
    }

}

class GetDatasByIdsService {

    static async getDataByIds(ids) {
        console.log('coming ids is : ', ids);
        const return_data = [];
        for (let i of ids) {
            const result = await StockModels.findByPk(i, {
                attributes: ['id', 'qty', 'stock', 'price', 'serial_number', 'material_id'],
                include: [
                    {
                        model: WarehouseModels,
                        attributes: [['id', 'warehouse_id'], 'material_name', 'type', 'unit']
                    },
                ]
            });
            if (result) {
                return_data.push(result.dataValues);
            }
        }
        return return_data;
    }
}


class ProvideStockService {
    static async provideStock(data) {

        for (let i in data.data) {
            if(!data.data[i].amount){
                throw Error('Enter amount in ' + Number(Number(i) + 1) + 'th row');
            }
            else if(data.data[i].amount <= 0){
                throw Error('Enter valid amount in ' + Number(Number(i) + 1) + 'th row');
            }
        }

        let return_data = [];
        for (let i in data.data) {
            const result = await this.findByPK(data.data[i].id, data.data[i].amount, i);
        }
        for (let i of data.data) {
            const result = await this.withdrawStock(i.id, i.amount);
            return_data.push(result);
            const result2 = await this.addArea(data, i);
        }
        console.log('object : ', return_data);
        return return_data;

    }

    static async findByPK(id, data, row_num) {
        const result = await StockModels.findByPk(id);
        if (result.stock < Number(data)) {
            throw InsufficientError.inSufficientError('Entering amount greater than stock amount in ' + Number(Number(row_num) + 1) + 'th row');
        }
        return true;
    }

    static async withdrawStock(id, amount) {
        const result = await StockModels.findByPk(id);
        result.stock = result.stock - Number(amount);
        await result.save();
        return result;
    }

    static async addArea(common_data, each_data) {
        const result = await AreaModels.create({
            qty: each_data.amount,
            stockId: each_data.id,
            serial_number: each_data.serial_number,
            material_id: each_data.material_id,
            card_number: common_data.card_number,
            username: common_data.username.trim().toLowerCase(),
            groupId: common_data.groupId,
            createdById: common_data.createdById,
            providerType: each_data.providerType
        })
        return true;
    }

}


class UpdateStockService {
    static async updateStock(data) {

        try{
            const result = await StockModels.findByPk(data.id);
        result.stock = data.stock;
        result.serial_number = data.serial_number;
        result.material_id = data.material_id;
        await result.save();

        const select_query = StockQueries.selectQuery();
        const query = select_query + ` where "StockModels"."id" = ${data.id} `;
        
        const returned_data = await sequelize.query(query);
        return returned_data[0][0];
        }
        catch(err){
            throw new Error('Update Stock Data Error : ',err);
        }

    }
}

class ReturnToWarehouseService {

    static async returnToWarehouse(data) {

        if(!data.return_amount){
            throw new Error('Please enter return amount');
        }
        else if(data.return_amount < 0){
            throw new Error('Please enter return amount greater than 0');
        }


        // 1 - Find By id;
        const result = await this.findStockById(data.id);

        // 2 - Check To Stock
        if (result.stock < data.return_amount) {
            throw InsufficientError.inSufficientError('Entering amount greater than stock amount');
        }
        else {

            let destroy_cond = false;

            // 3 - Add To Warehouse The amount
            const warehouse_data = await WarehouseModels.findByPk(data.warehouse_id);
            // 4 - Add return amount to leftover amount
            warehouse_data.leftover = warehouse_data.leftover + Number(data.return_amount);
            await warehouse_data.save();
            // 5 - Condition will work
            if (result.qty === Number(data.return_amount) + (warehouse_data.leftover - Number(data.return_amount))) {
                // The Data will delete from StockModel
                await result.destroy();
                destroy_cond = true;
            }
            else if (result.qty === Number(data.return_amount)) {
                // The Data will delete from StockModel
                await result.destroy();
                destroy_cond = true;
            }
            else {
                result.stock -= data.return_amount;
                result.qty -= data.return_amount;
                await result.save();
            }
            // 6 - Return result
            if (destroy_cond) {
                return {
                    id: data.id,
                    operation: 'delete'
                };
            }
            else{
                const result2 = await this.getPostedData(data);
                return result2;
            }
        }

    }

    static async findStockById(id) {
        const result = await StockModels.findByPk(id);
        return result;
    }

    static async getPostedData(data) {
        const select_query = StockQueries.selectQuery();
        const query = select_query + ` where "StockModels"."id" = ${data.id} `;
        const result = await sequelize.query(query);
        if(result){
            return result[0][0];
        }
        else{
            throw new Error('Data not found');  
        }
    }

}


class UnusableMaterialService{

    static async setUnusableMaterial(data){

        const result = await StockModels.findByPk(data.id);
        
        if(result.stock >= Number(data.amount)){
            result.stock = result.stock - data.amount;
            const result2 = await UnusableMaterialModels.create({
                comments: data.comments,
                amount: data.amount,
                stockId: data.id,
                createdById: data.createdById
            })
            await result.save();
            await result2.save();
            console.log('result is : ', result);
            return result;
        }
        else{
            throw InsufficientError.inSufficientError('Entering amount greater than stock amount');
        }

    }
}


module.exports = {
    FetchStockService,
    FilterStockDataService,
    GetByIdService,
    GetDatasByIdsService,
    UpdateStockService,
    ReturnToWarehouseService,
    ProvideStockService,
    UnusableMaterialService
};