
const {ProjectModels, GroupModels, CompanyModels, UserModels } = require ('../../models');

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
}

class UserService{
    static async fetchUsers(){
        const response = await UserModels.findAll({
            attributes: ['id', 'firstName', 'lastName']
        });        
        return response;
    }
}


module.exports = {
  
    ProjectService,
    GroupService,
    CompanyService,
    UserService

}