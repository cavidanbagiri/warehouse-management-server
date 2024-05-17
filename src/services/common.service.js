
const {ProjectModels, GroupModels, CompanyModels} = require ('../../models');

class ProjectService{
    static async fetchProjects(){
        const response = await ProjectModels.findAll();        
        return response;
    }
}

class GroupService{
    static async fetchGroups(){
        const response = await GroupModels.findAll();        
        return response;
    }
}

class CompanyService{
    static async fetchCompanies(){
        const response = await CompanyModels.findAll();        
        return response;
    }
}


module.exports = {
  
    ProjectService,
    GroupService,
    CompanyService

}