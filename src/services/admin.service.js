
const {ProjectModels, GroupModels, CompanyModels} = require ('../../models');

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
        const response = await CompanyModels.create(data);        
        return response;
    }
    static async fetchCompanies(){
        const response = await CompanyModels.findAll({
            attributes: ['id', 'company_name']
        });        
        return response;
    }
}


module.exports = {
  
    ProjectService,
    GroupService,
    CompanyService

}