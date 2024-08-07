
const { AreaModels, StockModels, sequelize } = require('../../models');


class FetchAreaService {
    static async getAreas(projectId) {
        const query = `
            select "WarehouseModels".material_name, "WarehouseModels".unit, "WarehouseModels".type, "WarehouseModels".po, 
            "AreaModels".id, "AreaModels".qty, "AreaModels".serial_number, "AreaModels".material_id, "AreaModels".card_number, Initcap("AreaModels".username ) as username, 
            "AreaModels"."providerType", "AreaModels"."createdAt" as deliver_date,
            "GroupModels".group_name,
            "MaterialCodeModels".material_code, INITCAP("MaterialCodeModels".material_description) as material_description
            from "AreaModels"
            LEFT JOIN "StockModels" on "StockModels"."id" = "AreaModels"."stockId"
            LEFT JOIN "WarehouseModels" on "WarehouseModels"."id" = "StockModels"."warehouseId"
            LEFT JOIN "GroupModels" on "GroupModels".id = "AreaModels"."groupId" 
            LEFT JOIN "MaterialCodeModels" on "MaterialCodeModels".id = "WarehouseModels"."materialCodeId"
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
            "AreaModels".id, "AreaModels".qty, "AreaModels".serial_number, "AreaModels".material_id, "AreaModels".card_number, "AreaModels".username, 
            "AreaModels"."providerType", "AreaModels"."createdAt" as deliver_date,
            "GroupModels".group_name,
            "MaterialCodeModels".material_code, INITCAP("MaterialCodeModels".material_description) as material_description`;

        query += ` from "AreaModels" 
            LEFT JOIN "StockModels" on "StockModels"."id" = "AreaModels"."stockId"
            LEFT JOIN "WarehouseModels" on "WarehouseModels"."id" = "StockModels"."warehouseId"
            LEFT JOIN "GroupModels" on "GroupModels".id = "AreaModels"."groupId" 
            LEFT JOIN "MaterialCodeModels" on "MaterialCodeModels".id = "WarehouseModels"."materialCodeId"
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


class GetByIdService {

    static async getById(id) {
        const row_query = `
            select "AreaModels".id, "AreaModels".qty, "AreaModels".serial_number, "AreaModels".material_id, "AreaModels".card_number, "AreaModels".username, "AreaModels"."createdAt",
            "WarehouseModels".unit, "WarehouseModels".material_name 
            from "AreaModels"
            left join "StockModels" on "AreaModels"."stockId" = "StockModels".id
            left join "WarehouseModels" on "StockModels"."warehouseId" ="WarehouseModels".id
            where "AreaModels"."id" = ${id}
        `

        const respond = await sequelize.query(row_query);
        return respond[0][0];
    }

}


class UpdateAreaService {
    static async updateArea(data) {
        const query = `
            UPDATE "AreaModels"
            SET
            "card_number" = '${data.card_number}',
            "username" = '${data.username}'
            WHERE "id" = ${data.id}
        `;
        const respond = await sequelize.query(query);
        const result = await AreaModels.findByPk(data.id);
        console.log('coming  is : ', result);
        return result;
    }
}

class ReturnAreaService{

    static async returnArea(data){
        if(!data.return_amount){
            throw new Error('Return amount is required');
        }
        else if(data.return_amount <= 0){
            throw new Error('Return amount should be greater than 0');
        }
        
        const result = await this.getById(data.id);
        if(result.qty < data.return_amount){
            throw new Error('Entering amount is greater than current amount');
        }
        else{
            // 1 - update qty
            result.qty = result.qty - data.return_amount;
            
            // 2 - update stock
            await this.findAndUpdateStock(result.stockId, data.return_amount);
            
            await result.save();
        }

        return result;
    }

    static async getById(id) {
        return await AreaModels.findByPk(id);
    }

    static async findAndUpdateStock(id, amount) {
        const result = await StockModels.findByPk(id);
        result.stock = result.stock + Number(amount);
        await result.save();
    }

}

module.exports = {
    FetchAreaService,
    FilterAreaDataService,
    GetByIdService,
    UpdateAreaService,
    ReturnAreaService
}