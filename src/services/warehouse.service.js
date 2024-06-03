
const { WarehouseModels, UserModels, CompanyModels, sequelize } = require('../../models');

class ReceiveWarehouseService {
    static async receiveMaterial(data) {
        for (let i of data) {
            await WarehouseModels.create(i);
        }
        return data;
    }
}

class FetchWarehouseDataService {
    static async fetchWarehouseData() {
        const query = `select "WarehouseModels".id,"WarehouseModels".document,"WarehouseModels".material_name,
        "WarehouseModels".type,"WarehouseModels".qty,"WarehouseModels".unit,"WarehouseModels".price,
        "WarehouseModels".currency,"WarehouseModels".po,"WarehouseModels"."orderedId","WarehouseModels"."companyId","WarehouseModels"."createdAt" as date,
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
        if (respond[0]) {
            for (let i of respond[0]) {
                // data[i.type] = i.count
                data.push(i);
            }
        }
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
        await respond.save();
        return respond;
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

module.exports = {
    ReceiveWarehouseService,
    FetchWarehouseDataService,
    GetPOWarehouseService,
    UpdatePOWarehouseService,
    FilterWarehouseDataService
}