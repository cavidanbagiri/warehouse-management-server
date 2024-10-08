
const { ProjectService, GroupService, CompanyService, UserService, OrderedService, RowInformClassService, DashboardAnalyzService } = require('../services/common.service');
const tryCatch = require('../utils/tryCatch');
class CommonController {


    static async fetchProjects(req, res, next) {
        tryCatch(
            await ProjectService.fetchProjects()
                .then((respond) => {
                    return res.status(201).json(respond);
                })
                .catch((err) => {
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
                    next(err)
                })
        )
    }

    static async filterCompanies(req, res, next) {
        const keys = req.query.company_name;
        tryCatch(
            await CompanyService.filterCompanies(keys)
                .then((respond) => {
                    return res.status(201).json(respond);
                })
                .catch((err) => {
                    next(err)
                })
        )
    }

    static async fetchUsers(req, res, next) {
        tryCatch(
            await UserService.fetchUsers()
                .then((respond) => {
                    return res.status(201).json(respond);
                })
                .catch((err) => {
                    next(err)
                })
        )
    }

    static async fetchOrdereds(req, res, next) {

        tryCatch(
            await OrderedService.fetchOrdereds()
                .then((respond) => {
                    return res.status(201).json(respond);
                })
                .catch((err) => {
                    next(err)
                })
        )
    }
    static async filterOrdereds(req, res, next) {
        const keys = req.query.ordered;
        tryCatch(
            await OrderedService.filterOrdereds(keys)
                .then((respond) => {
                    return res.status(201).json(respond);
                })
                .catch((err) => {
                    next(err)
                })
        )
    }

    static async getRowInfo(req, res, next) {
        const module = req.params.module;
        const row_id = req.params.row_id;
        tryCatch(
            await RowInformClassService.getRowInfo(module, row_id)
                .then((respond) => {
                    return res.status(200).json(respond);
                })
                .catch((err) => {
                    next(err)
                })
        )

    }


    static async getTopCompanies(req, res, next) {
        tryCatch(
            await DashboardAnalyzService.getTopCompanies()
                .then((respond) => {
                    return res.status(200).json(respond);
                })
                .catch((err) => {
                    next(err)
                })
        )
    }

    static async getStockAnalyz(req, res, next) {
        const project_id = req.params.project_id;
        tryCatch(
            await DashboardAnalyzService.getStockAnalyz(project_id)
                .then((respond) => {
                    return res.status(200).json(respond);
                })
                .catch((err) => {
                    next(err)
                })
        )
    }

    static async getGroupChartAnalyz(req, res, next) {
        const project_id = req.params.project_id;
        tryCatch(
            await DashboardAnalyzService.getGroupChartAnalyz(project_id)
                .then((respond) => {
                    return res.status(200).json(respond);
                })
                .catch((err) => {
                    next(err)
                })
        )
    }

}

module.exports = CommonController;