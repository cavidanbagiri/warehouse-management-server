

const tryCatch = require("../utils/tryCatch");
const { FetchStockService,
    FilterStockDataService,
    GetByIdService,
    GetDatasByIdsService,
    UpdateStockService,
    ReturnToWarehouseService,
    ProvideStockService
} = require("../services/stock.service");

class StockController {

    static async getStocks(req, res, next) {
        const projectId = req.params.projectId
        tryCatch(
            await FetchStockService.getStocks(projectId)
                .then(stocks => res.status(200).json(stocks))
                .catch((err) => {
                    next(err);
                })
        );
    }

    static async filterStockData(req, res, next) {
        const filtered_query = req.query;
        tryCatch(
            await FilterStockDataService.filterStockData(filtered_query)
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

    static async getDataByIds(req, res, next) {
        const ids = req.body;
        tryCatch(
            await GetDatasByIdsService.getDataByIds(ids)
                .then((respond) => {
                    return res.status(200).json(respond);
                })
                .catch((err) => {
                    console.log('get type error : ', err);
                    next(err);
                })
        )
    }

    static async provideStock(req, res, next) {
        const data = req.body;
        data.createdById = req.user.id;
        tryCatch(
            await ProvideStockService.provideStock(data)
                .then((respond) => {
                    return res.status(201).json({ msg: 'Successfully Provide' });
                }).catch((err) => {
                    {
                        console.error(err.message)
                        next(err);
                    }
                })
        )
    }

    static async updateStock(req, res, next) {
        const data = req.body;
        setTimeout(async () => {
            tryCatch(
                await UpdateStockService.updateStock(data)
                    .then((respond) => {
                        return res.status(201).json({ msg: 'Successfully Updated' });
                    }).catch((err) => {
                        {
                            console.error(err.message)
                            next(err);
                        }
                    })
            )
        }, 2000)
    }

    static async returnToWarehouse(req, res, next) {
        const data = req.body;
        setTimeout(async () => {
            tryCatch(
                await ReturnToWarehouseService.returnToWarehouse(data)
                    .then((respond) => {
                        return res.status(201).json({ msg: 'Successfully Updated' });
                    }).catch((err) => {
                        {
                            console.error(err.message)
                            next(err);
                        }
                    })
            )
        }, 2000)
    }

}

module.exports = StockController;