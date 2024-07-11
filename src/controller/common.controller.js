
const {ProjectService, GroupService, CompanyService, UserService } = require('../services/common.service');
const tryCatch = require('../utils/tryCatch');
class CommonController{
    

    static async fetchProjects(req, res, next){
        tryCatch(
            await ProjectService.fetchProjects()
            .then((respond)=>{
                return res.status(201).json(respond);
            })
            .catch((err)=>{
                console.log('fetch project error : ',err);
                next(err)
            })
        )
    }


    static async fetchGroups(req, res, next){
        tryCatch(
            await GroupService.fetchGroups()
            .then((respond)=>{
                return res.status(200).json(respond);
            })
            .catch((err)=>{
                console.log('fetch groups error : ',err);
                next(err)
            })
        )
    }

    static async fetchCompanies(req, res, next){
        
        tryCatch(
            await CompanyService.fetchCompanies()
            .then((respond)=>{
                return res.status(201).json(respond);
            })
            .catch((err)=>{
                console.log('fetch company error : ',err);
                next(err)
            })
        )
    }

    static async fetchUsers(req, res, next){
        
        tryCatch(
            await UserService.fetchUsers()
            .then((respond)=>{
                return res.status(201).json(respond);
            })
            .catch((err)=>{
                console.log('fetch company error : ',err);
                next(err)
            })
        )
    }

}

module.exports = CommonController;