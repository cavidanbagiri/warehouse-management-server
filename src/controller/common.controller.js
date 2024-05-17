
const {ProjectService, GroupService, CompanyService} = require('../services/common.service');

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
                return res.status(201).json(respond);
            })
            .catch((err)=>{
                console.log('fetch groups error : ',err);
                next(err)
            })
        )
    }

    static async fetchCompanies(req, res, next){
        
        tryCatch(
            await CompanyService.fetchCompanies(company_data)
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