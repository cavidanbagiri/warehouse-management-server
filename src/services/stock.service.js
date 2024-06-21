
const { StockModels, sequelize} = require('../../models');

class FetchStockService {

    static async getStocks(){

        const query = `select "StockModels".id, "StockModels".qty, "StockModels".stock, "StockModels".serial_number,"StockModels".material_id,
        "WarehouseModels".document, "WarehouseModels".material_name, "WarehouseModels".type,"WarehouseModels".unit,"WarehouseModels".price,
        "WarehouseModels".currency,"WarehouseModels".po,"WarehouseModels"."orderedId","WarehouseModels"."companyId",
        "WarehouseModels"."createdAt" as date,
        "UserModels"."firstName", "UserModels"."lastName",
        "CompanyModels".company_name
        from "StockModels" 
        left join "WarehouseModels" on "StockModels"."warehouseId" = "WarehouseModels".id
        left join "CompanyModels" on "CompanyModels".id = "WarehouseModels"."companyId"
        left join "UserModels" on "UserModels".id = "WarehouseModels"."orderedId" 
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
        "CompanyModels".company_name`;

        query += ` from "StockModels" 
        left join "WarehouseModels" on "StockModels"."warehouseId" = "WarehouseModels".id
        left join "CompanyModels" on "CompanyModels".id = "WarehouseModels"."companyId"
        left join "UserModels" on "UserModels".id = "WarehouseModels"."orderedId" 
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

module.exports = {
    FetchStockService,
    FilterStockDataService
};