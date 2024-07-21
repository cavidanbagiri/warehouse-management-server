
const { AreaModels, sequelize } = require('../../models');


class FetchAreaService {
    static async getAreas(projectId) {
        const query = `
            select "WarehouseModels".material_name, "WarehouseModels".unit, "WarehouseModels".type, "WarehouseModels".po, 
            "AreaModels".qty, "AreaModels".serial_number, "AreaModels".material_id, "AreaModels".card_number, "AreaModels".username, 
            "AreaModels"."providerType", "AreaModels"."createdAt" as deliver_date,
            "GroupModels".group_name
            from "AreaModels"
            LEFT JOIN "StockModels" on "StockModels"."id" = "AreaModels"."stockId"
            LEFT JOIN "WarehouseModels" on "WarehouseModels"."id" = "StockModels"."warehouseId"
            LEFT JOIN "GroupModels" on "GroupModels".id = "AreaModels"."groupId" 
            where "projectId"=${projectId}`;

        const respond = await sequelize.query(query);
        return respond[0];
    }

}


class FilterAreaDataService {
    static async filterAreaData(data) {
        const query = this.convertToSql(data);
        const respond = await sequelize.query(query);
        return respond[0];
    }

    static convertToSql(data) {
        let query = `select "WarehouseModels".material_name, "WarehouseModels".unit, "WarehouseModels".type, "WarehouseModels".po,
            "AreaModels".qty, "AreaModels".serial_number, "AreaModels".material_id, "AreaModels".card_number, "AreaModels".username, 
            "AreaModels"."providerType", "AreaModels"."createdAt" as deliver_date,
            "GroupModels".group_name`;

        query += ` from "AreaModels" 
            LEFT JOIN "StockModels" on "StockModels"."id" = "AreaModels"."stockId"
            LEFT JOIN "WarehouseModels" on "WarehouseModels"."id" = "StockModels"."warehouseId"
            LEFT JOIN "GroupModels" on "GroupModels".id = "AreaModels"."groupId" 
        `
        let where_query = ' where ';
        for (let [key, value] of Object.entries(data)) {
            if (key === 'material_name') {
                where_query += `"${key}" ILIKE '%${value}%'  and `
            }
            else if (key === 'createdAt') {
                where_query += `"AreaModels"."${key}"::date='${value}'  and `
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
        query += ' order by "AreaModels"."createdAt" asc'

        console.log('coming filter area models query is : ', query);

        return query;
    }

}

module.exports = {
    FetchAreaService,
    FilterAreaDataService
}