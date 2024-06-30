
const { StockModels, sequelize, WarehouseModels, CompanyModels, UserModels} = require('../../models');

const InsufficientError = require('../exceptions/insufficient_exceptions.');

class FetchStockService {

    static async getStocks(){

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

        let where_query = ' where ';
        for (let [key, value] of Object.entries(data)) {
            if(key === 'material_name'){
                where_query += `"${key}" ILIKE '%${value}%'  and `
            }
            else if(key === 'createdAt'){
                where_query += `"StockModels"."${key}"::date='${value}'  and `
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
        console.log('stock qeury : ', query);
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
        console.log(respond);
        return respond;
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
            throw InsufficientError.inSufficientError();
        }
        else{
            console.log('this is work');
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
            else{
                result.stock -= data.return_amount;
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
    UpdateStockService,
    ReturnToWarehouseService
};