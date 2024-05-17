
const tryCatch = require('../utils/tryCatch');

const { ProjectService, GroupService, CompanyService } = require('../services/admin.service');

class AdminController {

    static async createProject(req, res, next){
        const project_data = {
            project_name: req.body.project_name
        }
        tryCatch(
            await ProjectService.createProject(project_data)
            .then((respond)=>{
                return res.status(201).json({'msg':'Project Created'});
            })
            .catch((err)=>{
                console.log('create project error : ',err);
                next(err)
            })
        )
    }

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

    static async createGroup(req, res, next){
        const group_data = {
            group_name: req.body.group_name
        }
        tryCatch(
            await GroupService.createGroup(group_data)
            .then((respond)=>{
                return res.status(201).json({'msg':'Group Created'});
            })
            .catch((err)=>{
                console.log('create group error : ',err);
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

    static async createCompany(req, res, next){
        const company_data = {
            company_name: req.body.company_name
        }
        tryCatch(
            await CompanyService.createCompany(company_data)
            .then((respond)=>{
                return res.status(201).json({'msg':'Company Created'});
            })
            .catch((err)=>{
                console.log('create company error : ',err);
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

}

module.exports = AdminController;