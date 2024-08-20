
const { where } = require('sequelize');
const { Op } = require("sequelize");
const {ProjectModels, GroupModels, CompanyModels, UserModels, UserStatusModels, OrderedModels, MaterialCodeModels} = require ('../../models');

class ProjectService{
    static async createProject(data){
        // Check Project Name
        const project = await ProjectModels.findOne({
            where:{
                project_name: data.project_name,
                abbrevation_name: data.abbrevation_name
            }
        })
        if(project){
            throw new Error('Project already available');   
        }
        else{
            const response = await ProjectModels.create(data);
            return response;
        }
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
        const group = await GroupModels.findOne({
            where:{
                group_name: data.group_name
            }
        })
        if(group){
            throw new Error('Group already available');   
        }
        else{
            const response = await GroupModels.create(data);
            return response;
        }
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
            throw new Error('Company already available');
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
            attributes: ['id', 'company_name'],
        });        
        return response;
    }
}


class OrderedService {
    static async createOrdered(data){
        const cond = await this.checkOrderedAvailable(data);
        if(cond){
            const response = await OrderedModels.create(data);
            return response;
        }
        else{
            throw new Error('Ordered already available');
        }
    }
    static async checkOrderedAvailable(data){
        const ordered = await OrderedModels.findOne({
            where:{
                [Op.and]: [{firstName: data.firstName}, {lastName: data.lastName}]
            }
        });
        return ordered ? false : true;
    }

    static async fetchOrdereds(){
        const response = await OrderedModels.findAll({
            attributes: ['id', 'firstName', 'lastName', 'email', 'projectId']
        });        
        return response;
    }

}


class UserStatusService {
    static async createUserStatus(data){
        return await UserStatusModels.create(data);
    }

    static async fetchUserStatus(){
        const response = await UserStatusModels.findAll({
            attributes: ['id', 'status_name', 'status_code']
        });
        return response;
    }
}


class MaterialCodeService {

    static async createMaterialCode(data){

        const cond = await this.checkMaterialCodeAvailable(data);
        if(!cond){
            throw new Error('Material Code already available');
        }
        const lastId = await this.getLastId();
        data.material_code = lastId + 1000000;
        data.material_description = data.material_description.toLowerCase().trim();
        
        return await MaterialCodeModels.create(data);
    }

    static async checkMaterialCodeAvailable(data){
        const materialCode = await MaterialCodeModels.findOne({
            where:{
                material_description: data.material_description
            }
        });
        return materialCode ? false : true;
    }

    static async getLastId(){
        const response = await MaterialCodeModels.max('id');
        return response;
    }

    static async fetchMaterialCodes(){        
        const response = await MaterialCodeModels.findAll({
            attributes: ['id', 'material_description', 'material_code']
        });
        return response;
    }
    
    static async filterMaterialCodes(query){        
        const response = await MaterialCodeModels.findAll({
            attributes: ['id', 'material_description', 'material_code'],
            where: {
                [Op.or]: [{material_description: {[Op.iLike]: `%${query}%`}}, {material_code: {[Op.iLike]: `%${query}%`}}],
            }
        });
        return response;
    }

}

module.exports = {
  
    ProjectService,
    GroupService,
    CompanyService,
    OrderedService,
    UserStatusService, 
    MaterialCodeService

}