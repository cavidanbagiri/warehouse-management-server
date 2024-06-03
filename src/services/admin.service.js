
const { where } = require('sequelize');
const { Op } = require("sequelize");
const {ProjectModels, GroupModels, CompanyModels, UserModels} = require ('../../models');

class ProjectService{
    static async createProject(data){
        const response = await ProjectModels.create(data);        
        return response;
    }
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
    static async createGroup(data){
        const response = await GroupModels.create(data);        
        return response;
    }
    static async fetchGroups(){
        const response = await GroupModels.findAll({
            attributes: ['id', 'group_name']
        });        
        return response;
    }
}

class CompanyService{
    static async createCompany(data){
        
        const cond = await this.checkCompanyAvailable(data);
        if(cond){
            const response = await CompanyModels.create(data);
            return response;
        }
        else{
            return {'Error': 'Company already available'};
        }
    }
    static async checkCompanyAvailable(data){
        const company = await CompanyModels.findOne({
            where:{
                company_name: data.company_name
            }
        });
        return company ? false : true;
    }
    static async fetchCompanies(){
        const response = await CompanyModels.findAll({
            attributes: ['id', 'company_name']
        });        
        return response;
    }
}


class OrderedService {
    static async createOrdered(data){
        const cond = await this.checkOrderedAvailable(data);
        if(cond){
            const response = await UserModels.create(data);
            return response;
        }
        else{
            return {'Error': 'User already available'};
        }
    }
    static async checkOrderedAvailable(data){
        const ordered = await UserModels.findOne({
            where:{
                [Op.and]: [{firstName: data.firstName}, {lastName: data.lastName}]
            }
        });
        return ordered ? false : true;
    }
}

module.exports = {
  
    ProjectService,
    GroupService,
    CompanyService,
    OrderedService

}