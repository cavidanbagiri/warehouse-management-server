
const { ProjectModels,
    GroupModels,
    CompanyModels,
    UserModels,
    WarehouseModels,
    StockModels,
    AreaModels,
    ServiceMaterialModels,
    UnusableMaterialModels,
    CertificateAndPassportModels
} = require('../../models');

const { Op } = require("sequelize");

const db = require('../../models/index');

class ProjectService {
    static async fetchProjects() {
        const response = await ProjectModels.findAll(
            {
                attributes: ['id', 'project_name']
            }
        );
        return response;
    }
}

class GroupService {
    static async fetchGroups() {
        const response = await GroupModels.findAll({
            attributes: ['id', 'group_name']
        });
        return response;
    }
}

class CompanyService {
    static async fetchCompanies() {
        const response = await CompanyModels.findAll({
            attributes: ['id', 'company_name']
        });
        return response;
    }

    static async filterCompanies(query) {
        const response = await CompanyModels.findAll({
            attributes: ['id', 'company_name'],
            where: {
                [Op.or]: [{ company_name: { [Op.iLike]: `%${query}%` } }],
            }
        });
        return response;
    }

}

class DashboardAnalyzService {
    static async getTopCompanies() {
        const response = await CompanyModels.findAll({
            attributes: ['id', 'company_name'],
            limit: 15
        });
        return response;
    }

    static async getStockAnalyz(project_id) {
        const return_data = [];

        await WarehouseModels.count({
            where: {
                projectId: project_id,
                leftover: { [Op.ne]: 0 }
            },
        }).then((data) => {
            return_data.push({ 'name': "Warehouse", count: data });
        })

        await StockModels.count({
            where: {
                stock: { [Op.ne]: 0 }
            },
            include: {
                model: WarehouseModels,
                where: { projectId: project_id },
                required: false
            },
        }).then((data) => {
            return_data.push({ 'name': "Stock", count: data });
        })

        await AreaModels.count({
            where: {
                qty: { [Op.ne]: 0 }
            },
            include: {
                model: StockModels,
                include: {
                    model: WarehouseModels,
                    where: { projectId: project_id },
                    required: false
                }
            },
        }).then((data) => {
            return_data.push({ 'name': "Area", count: data });
        })

        await ServiceMaterialModels.count({
            where: {
                amount: { [Op.ne]: 0 }
            },
            include: {
                model: StockModels,
                include: {
                    model: WarehouseModels,
                    where: { projectId: project_id },
                    required: false
                }
            },
        })
            .then((data) => {
                return_data.push({ 'name': "Service", count: data });
            })

        await UnusableMaterialModels.count({
            where: {
                amount: { [Op.ne]: 0 }
            },
            include: {
                model: StockModels,
                include: {
                    model: WarehouseModels,
                    where: { projectId: project_id },
                    required: false
                }
            },
        })
            .then((data) => {
                return_data.push({ 'name': "Unusable", count: data });
            })
        return return_data;
    }

    static async getGroupChartAnalyz(project_id) {

        const query = `select group_name, sum(count) from (	
	        select INITCAP(group_name) as group_name, count(distinct po) from "WarehouseModels"
	        left join "OrderedModels" on "OrderedModels".id = "WarehouseModels"."orderedId"
	        left join "GroupModels" on "GroupModels".id = "OrderedModels"."groupId"
	        where "WarehouseModels"."projectId" = ${2}
	        group by "GroupModels".group_name
	        union 
	        select INITCAP(group_name), 0 as count from "GroupModels"
	        order by group_name
            ) as result
            group by group_name`;

        const response = await db.sequelize.query(query);
        return response[0];

    }

}

class UserService {
    static async fetchUsers() {
        const row_query = `select id, 
        select id, 
        INITCAP(CONCAT("OrderedModels"."firstName", ' ', "OrderedModels"."lastName")) as username
        from "OrderedModels"
        from "UserModels"`;
        const response = await db.sequelize.query(row_query);
        return response[0];
    }
}

class OrderedService {

    static async fetchOrdereds() {
        const row_query = `select id, 
        INITCAP(CONCAT("OrderedModels"."firstName", ' ', "OrderedModels"."lastName")) as username
        from "OrderedModels"`;
        const response = await db.sequelize.query(row_query);
        return response[0];
    }

    static async filterOrdereds(query) {
        console.log('query is : ', query);
        const row_query = `select id, 
        INITCAP(CONCAT("OrderedModels"."firstName", ' ', "OrderedModels"."lastName")) as username
        from "OrderedModels"
        where INITCAP(CONCAT("OrderedModels"."firstName", ' ', "OrderedModels"."lastName")) ILIKE '%${query}%'`;
        const response = await db.sequelize.query(row_query);
        return response[0];
    }

}

class RowInformClassService {

    static async getRowInfo(module, row_id) {

        let result = null;
        if (module === 'warehouse') {
            console.log('warehouse id work');
            result = await this.getWarehouseInformation(row_id);
        }
        else if (module === 'stock') {
            result = await this.getStockInformation(row_id);
        }
        return result;
    }

    static async getStockInformation(stock_id) {
        const stock_result = await StockModels.findByPk(stock_id);
        const result = await this.getWarehouseInformation(stock_result.warehouseId);
        return result;
    }

    static async getWarehouseInformation(warehouse_id) {
        const result = await WarehouseModels.findByPk(warehouse_id, {
            attributes: ['id', 'document', 'material_name', 'type', 'qty', 'unit', 'price', 'currency', 'po', 'leftover'],
            include: [
                { model: ProjectModels, attributes: ['id', 'project_name'] },
                { model: UserModels, attributes: ['id', 'firstName', 'lastName'] },
                { model: CertificateAndPassportModels, attributes: ['id', 'filename', 'location'] },
                {
                    model: StockModels,
                    attributes: ['qty', 'stock', 'serial_number', 'material_id'],
                    include: [
                        {
                            model: AreaModels,
                            attributes: ['id', 'card_number', 'username'],
                            include: [
                                { model: GroupModels, attributes: ['id', 'group_name'] },
                            ]
                        },
                        {
                            model: ServiceMaterialModels,
                            attributes: ['id', 'amount', 'comments']
                        },
                        { model: UnusableMaterialModels, attributes: ['id', 'amount'] },
                    ]
                },
            ]
        });
        return result;
    }

}

module.exports = {

    ProjectService,
    GroupService,
    CompanyService,
    UserService,
    OrderedService,
    RowInformClassService,
    DashboardAnalyzService

}