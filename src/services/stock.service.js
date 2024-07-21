
const { StockModels, sequelize, WarehouseModels, CompanyModels, UserModels, AreaModels} = require('../../models');

const InsufficientError = require('../exceptions/insufficient_exceptions.');

class FetchStockService {

    static async getStocks(projectId){
        console.log('this function is working ----------------------- ');
        const query = `select "StockModels".id, "StockModels".qty, "StockModels".stock, "StockModels".serial_number,"StockModels".material_id,
        "WarehouseModels".document, "WarehouseModels".material_name, "WarehouseModels".type,"WarehouseModels".unit,"WarehouseModels".price,
        "WarehouseModels".currency,"WarehouseModels".po,"WarehouseModels"."orderedId","WarehouseModels"."companyId",
        "WarehouseModels"."createdAt" as date,
        "UserModels"."firstName", "UserModels"."lastName",
        "GroupModels".group_name,
        "CompanyModels".company_name
        from "StockModels" 
        left join "WarehouseModels" on "StockModels"."warehouseId" = "WarehouseModels".id
        left join "CompanyModels" on "CompanyModels".id = "WarehouseModels"."companyId"
        left join "UserModels" on "UserModels".id = "WarehouseModels"."orderedId"
        left join "GroupModels" on "UserModels"."groupId" = "GroupModels".id
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
        "UserModels"."firstName", "UserModels"."lastName",
        "GroupModels".group_name,
        "CompanyModels".company_name`;

        query += ` from "StockModels" 
        left join "WarehouseModels" on "StockModels"."warehouseId" = "WarehouseModels".id
        left join "CompanyModels" on "CompanyModels".id = "WarehouseModels"."companyId"
        left join "UserModels" on "UserModels".id = "WarehouseModels"."orderedId" 
        left join "GroupModels" on "UserModels"."groupId" = "GroupModels".id
        `

        console.log('coming data is : ', data);

        let where_query = ' where ';
        for (let [key, value] of Object.entries(data)) {
            if(key === 'material_name'){
                where_query += `"${key}" ILIKE '%${value}%'  and `
            }
            else if(key === 'createdAt'){
                where_query += `"StockModels"."${key}"::date='${value}'  and `
            }
            else if(key === 'projectId'){
                where_query += `"WarehouseModels"."${key}"='${value}'  and `
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
                        attributes: [['id', 'warehouse_id'],'material_name', 'unit']
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
        for(let i of ids){
            const result = await StockModels.findByPk(i, {
                attributes: ['id', 'qty', 'stock', 'price', 'serial_number', 'material_id'],
                include: [
                    {
                        model: WarehouseModels,
                        attributes: [['id', 'warehouse_id'],'material_name', 'type', 'unit']
                    },
                ]
            });
            if(result){
                return_data.push(result.dataValues);
            }
        }
        return return_data;
    }
}


class ProvideStockService {
    static async provideStock(data){    

        //console.log('coming data is : ', data);
        // let cond = true;
        for(let i in data.data){
            const result = await this.findByPK(data.data[i].id, data.data[i].amount, i);
            // if(!result){
            //     cond = false;
            // }
        }
        // if(cond){
            for(let i of data.data){
                const result = await this.withdrawStock(i.id, i.amount);
                const result2 = await this.addArea(data);
            }
            return true;
        //}
        // return 'OK';
    }

    static async findByPK(id, data, row_num) {
        const result = await StockModels.findByPk(id);
        if(result.stock < Number(data) ) {
            throw InsufficientError.inSufficientError('Entering amount greater than stock amount in '+ Number(Number(row_num) + 1) + 'th row');
        }
        return true;
    }

    static async withdrawStock(id, amount) {
        const result = await StockModels.findByPk(id);
        result.stock = result.stock - Number(amount);
        await result.save();
    }

    static async addArea(data) {
        for(let i of data.data){
            console.log('i is : ', i);
            const result = await AreaModels.create({
                qty: i.amount,
                stockId: i.id,
                serial_number: i.serial_number,
                material_id: i.material_id,
                card_number: data.card_number,
                username: data.username.trim().toLowerCase(),
                groupId: data.groupId,
                createdById: data.createdById,
                providerType: i.providerType
            })
        }
        return true;
    }

}


class UpdateStockService {
    static async updateStock (data){

        const result = await StockModels.findByPk(data.id);
        result.stock = data.stock;
        result.serial_number = data.serial_number;
        result.material_id = data.material_id;
        await result.save();
        return result;

    }
}

class ReturnToWarehouseService {

    static async returnToWarehouse(data){

        // 1 - Find By id;
        const result = await this.findStockById(data.id);

        // 2 - Check To Stock
        if(result.stock < data.return_amount ) {
            throw InsufficientError.inSufficientError('Entering amount greater than stock amount');
        }
        else{
            // 3 - Add To Warehouse The amount
            const warehouse_data = await WarehouseModels.findByPk(data.warehouse_id);
            // 4 - Add return amount to leftover amount
            warehouse_data.leftover = warehouse_data.leftover + Number(data.return_amount);
            await warehouse_data.save();
            // 5 - Condition will work
            if(result.qty === Number(data.return_amount) + (warehouse_data.leftover - Number(data.return_amount)) ){
                // The Data will delete from StockModel
                await result.destroy();
            }
            else if(result.qty === Number(data.return_amount)){
                // The Data will delete from StockModel
                await result.destroy();
            }
            else{
                result.stock -= data.return_amount;
                result.qty -= data.return_amount;
                await result.save();
            }
            return result;
        }

    }

    static async findStockById (id) {
        const result = await StockModels.findByPk(id);
        return result;
    }

}

module.exports = {
    FetchStockService,
    FilterStockDataService,
    GetByIdService,
    GetDatasByIdsService,
    UpdateStockService,
    ReturnToWarehouseService,
    ProvideStockService
};