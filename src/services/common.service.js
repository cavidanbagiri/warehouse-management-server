
const {ProjectModels, GroupModels, CompanyModels, UserModels } = require ('../../models');

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

module.exports = {
  
    ProjectService,
    GroupService,
    CompanyService,
    UserService,
    OrderedService

}