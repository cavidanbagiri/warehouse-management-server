
const {ProjectModels, 
    GroupModels, 
    CompanyModels, 
    UserModels, 
    WarehouseModels, 
    StockModels, 
    AreaModels, 
    ServiceMaterialModels,
    UnusableMaterialModels,
    CertificateAndPassportModels
} = require ('../../models');

const { Op } = require("sequelize");

const db = require('../../models/index');

class ProjectService{
    static async fetchProjects(){
        const response = await ProjectModels.findAll(
            {
                attributes: ['id', 'project_name']
            }
        );        
        return response;
    }
}

class GroupService{
    static async fetchGroups(){
        const response = await GroupModels.findAll({
            attributes: ['id', 'group_name']
        });        
        return response;
    }
}

class CompanyService{
    static async fetchCompanies(){
        const response = await CompanyModels.findAll({
            attributes: ['id', 'company_name']
        });        
        return response;
    }

    static async filterCompanies(query){
        const response = await CompanyModels.findAll({
            attributes: ['id', 'company_name'],
            where: {
                [Op.or]: [{company_name: {[Op.iLike]: `%${query}%`}}],
            }
        });        
        return response;
    }
}

class UserService{
    static async fetchUsers(){
        const row_query = `select id, 
        select id, 
        INITCAP(CONCAT("OrderedModels"."firstName", ' ', "OrderedModels"."lastName")) as username
        from "OrderedModels"
        from "UserModels"`;
        const response = await db.sequelize.query(row_query);
        return response[0];
    }
}

class OrderedService{

    static async fetchOrdereds(){
        const row_query = `select id, 
        INITCAP(CONCAT("OrderedModels"."firstName", ' ', "OrderedModels"."lastName")) as username
        from "OrderedModels"`;
        const response = await db.sequelize.query(row_query);
        return response[0];
    }

    static async filterOrdereds(query){
        console.log('query is : ', query);
        const row_query = `select id, 
        INITCAP(CONCAT("OrderedModels"."firstName", ' ', "OrderedModels"."lastName")) as username
        from "OrderedModels"
        where INITCAP(CONCAT("OrderedModels"."firstName", ' ', "OrderedModels"."lastName")) ILIKE '%${query}%'`;
        const response = await db.sequelize.query(row_query);
        return response[0];
    }
        
}

class RowInformClassService{

    static async getRowInfo(module, row_id){
        
        let result = null;
        if(module === 'warehouse'){
            console.log('warehouse id work');
            result = await this.getWarehouseInformation(row_id);
        }
        else if(module === 'stock'){
            result = await this.getStockInformation(row_id);
        }
        return result;
    }

    static async getStockInformation(stock_id){
        const stock_result = await StockModels.findByPk(stock_id);
        const result = await this.getWarehouseInformation(stock_result.warehouseId);
        return result;
    }

    static async getWarehouseInformation(warehouse_id){
        const result = await WarehouseModels.findByPk(warehouse_id,{
            attributes: ['id', 'document', 'material_name', 'type', 'qty', 'unit', 'price', 'currency', 'po', 'leftover'],
            include: [
                {model: ProjectModels, attributes: ['id', 'project_name']},
                {model: UserModels, attributes: ['id', 'firstName', 'lastName']},
                {model: CertificateAndPassportModels, attributes: ['id', 'filename', 'location']},
                {
                    model: StockModels, 
                    attributes: ['qty','stock','serial_number', 'material_id'],
                    include: [
                        {
                            model: AreaModels, 
                            attributes: ['id', 'card_number', 'username'],
                            include: [
                                {model: GroupModels, attributes: ['id', 'group_name']},
                            ]
                        },
                        {
                            model: ServiceMaterialModels,
                            attributes: ['id', 'amount', 'comments']
                        },
                        {model: UnusableMaterialModels, attributes: ['id', 'amount']},
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
    RowInformClassService

}