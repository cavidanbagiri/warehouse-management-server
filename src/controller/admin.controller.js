
const tryCatch = require('../utils/tryCatch');

const { ProjectService, GroupService, CompanyService, OrderedService, UserStatusService} = require('../services/admin.service');

class AdminController {

    static async createProject(req, res, next) {
        const project_data = {
            project_name: req.body.project_name
        }
       setTimeout(async()=>{
        tryCatch(
            await ProjectService.createProject(project_data)
                .then((respond) => {
                    return res.status(201).json({ 'msg': 'Project Created' });
                })
                .catch((err) => {
                    console.log('create project error : ', err);
                    next(err)
                })
        )
       }, 2000)
    }

    static async fetchProjects(req, res, next) {
        tryCatch(
            await ProjectService.fetchProjects()
                .then((respond) => {
                    return res.status(200).json(respond);
                })
                .catch((err) => {
                    console.log('fetch project error : ', err);
                    next(err)
                })
        )
    }

    static async createGroup(req, res, next) {
        const group_data = {
            group_name: req.body.group_name.toLowerCase().trim(),
        }
        tryCatch(
            await GroupService.createGroup(group_data)
                .then((respond) => {
                    return res.status(201).json({ respond });
                })
                .catch((err) => {
                    console.log('create group error : ', err);
                    next(err)
                })
        )
    }

    static async fetchGroups(req, res, next) {
        tryCatch(
            await GroupService.fetchGroups()
                .then((respond) => {
                    return res.status(200).json(respond);
                })
                .catch((err) => {
                    console.log('fetch groups error : ', err);
                    next(err)
                })
        )
    }

    static async createCompany(req, res, next) {
        const company_data = {
            email: req.body.email.trim(),
            phone: req.body.phone.trim(),
            country: req.body.country.trim(),
            company_name: req.body.company_name.trim(),
        }
        tryCatch(
            await CompanyService.createCompany(company_data)
                .then((respond) => {
                    return res.status(201).json(respond);
                })
                .catch((err) => {
                    next(err)
                })
        )

    }

    static async fetchCompanies(req, res, next) {
        tryCatch(
            await CompanyService.fetchCompanies()
                .then((respond) => {
                    return res.status(201).json(respond);
                })
                .catch((err) => {
                    console.log('fetch company error : ', err);
                    next(err)
                })
        )
    }

    static async fetchUserStatus(req, res, next) {
        tryCatch(
            await UserStatusService.fetchUserStatus()
                .then((respond) => {
                    return res.status(200).json(respond);
                })
                .catch((err) => {
                    console.log('fetch user status error : ', err);
                    next(err)
                })
        )
    }

    static async createOrdered (req, res, next) {
        const data = req.body;
        data.firstName = data.firstName.charAt(0).toLowerCase()+data.firstName.slice(1).trim();
        data.lastName = data.lastName.charAt(0).toLowerCase()+data.lastName.slice(1).trim();
        tryCatch(
            await OrderedService.createOrdered(data)
                .then((respond) => {
                    return res.status(201).json(respond);
                })
                .catch((err) => {
                    next(err)
                })
        )
    }

    static async fetchOrdereds (req, res, next) {
        tryCatch(
            await OrderedService.fetchOrdereds()
                .then((respond) => {
                    return res.status(200).json(respond);
                })
                .catch((err) => {
                    next(err)
                })
        )
    }

    static async createUserStatus (req, res, next) {
        const data = req.body;
        tryCatch(
            await UserStatusService.createUserStatus(data)
                .then((respond)=>{
                    return res.status(201).json(respond);
                }).catch(err=>{
                    next(err);
                })
        )
    }

}

module.exports = AdminController;