
const tryCatch = require('../utils/tryCatch');
const { FetchAreaService, FilterAreaDataService, GetByIdService, UpdateAreaService, ReturnAreaService, UnusableServiceReturnToStockService } = require('../services/area.service');

class AreaController {

    static async getAreas(req, res, next) {
        const projectId = req.params.projectId
        tryCatch(
            await FetchAreaService.getAreas(projectId)
                .then(areas => res.status(200).json(areas))
                .catch((err) => {
                    next(err);
                })
        )
    }


    static async filterAreaData(req, res, next) {
        const filtered_query = req.query;
        tryCatch(
            await FilterAreaDataService.filterAreaData(filtered_query)
                .then((respond) => {
                    return res.status(200).json(respond);
                })
                .catch((err) => {
                    next(err);
                })
        )
    }

    static async getById(req, res, next) {
        const id = req.params.id;
        tryCatch(
            await GetByIdService.getById(id)
                .then((respond) => {
                    return res.status(200).json(respond);
                })
                .catch((err) => {
                    console.log('get type error : ', err);
                    next(err);
                })
        )
    }

    static async updateArea(req, res, next) {
        const data = req.body;
        // setTimeout(async () => {
        tryCatch(
            await UpdateAreaService.updateArea(data)
                .then((respond) => {
                    return res.status(201).json({ msg: 'Successfully Updated', data: respond });
                }).catch((err) => {
                    {
                        console.error(err.message)
                        next(err);
                    }
                })
        )
        // }, 2000)
    }

    static async returnArea(req, res, next) {
        const data = req.body;
        tryCatch(
            await ReturnAreaService.returnArea(data)
                .then((respond) => {
                    return res.status(201).json({ msg: 'Successfully Updated', data: respond });
                }).catch((err) => {
                    {
                        console.error(err.message)
                        next(err);
                    }
                })
        )
    }

    static async getUnusableMaterials(req, res, next) {
        const projectId = req.params.projectId
        tryCatch(
            await FetchAreaService.getUnusableMaterials(projectId)
                .then(areas => res.status(200).json(areas))
                .catch((err) => {
                    next(err);
                })
        )
    }

    static async getServiceMaterials(req, res, next) {
        const projectId = req.params.projectId
        tryCatch(
            await FetchAreaService.getServiceMaterials(projectId)
                .then(areas => res.status(200).json(areas))
                .catch((err) => {
                    next(err);
                })
        )
    }

    static async unusableReturnToStock(req, res, next) {
        const data = req.body;
        setTimeout(async () => {
            tryCatch(
                await UnusableServiceReturnToStockService.unusableReturnToStock(data)
                    .then((respond) => {
                        return res.status(201).json({ msg: 'Successfully Returned', data: respond });
                    }).catch((err) => {
                        {
                            console.error(err.message)
                            next(err);
                        }
                    })
            )
        },2000)
    }

    static async serviceReturnToStock(req, res, next) {
        const data = req.body;
        setTimeout(async () => {
            tryCatch(
                await UnusableServiceReturnToStockService.serviceReturnToStock(data)
                    .then((respond) => {
                        return res.status(201).json({ msg: 'Successfully Returned', data: respond });
                    }).catch((err) => {
                        {
                            console.error(err.message)
                            next(err);
                        }
                    })
            )
        },2000)
    }

}

module.exports = AreaController