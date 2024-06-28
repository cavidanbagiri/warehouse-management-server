

const tryCatch = require("../utils/tryCatch");
const {FetchStockService, FilterStockDataService, GetByIdService, UpdateStockService, ReturnToWarehouseService} = require("../services/stock.service");

class StockController {

    static async getStocks(req, res, next) {
        tryCatch(
            await FetchStockService.getStocks()
                .then(stocks => res.status(200).json(stocks))
                .catch((err)=>{
                    next(err);
                })
        );
    }

    static async filterStockData(req, res, next){
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

    static async getById(req, res, next){
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

    static async updateStock(req, res, next){
        const data = req.body;
        tryCatch(
            await UpdateStockService.updateStock(data)
                .then((respond) => {
                    return res.status(201).json({msg: 'Successfully Updated'});
                }).catch((err)=>{{
                    console.error(err.message)
                    next(err);
                }})
        )
    }

    static async returnToWarehouse(req, res, next){
        const data = req.body;
        tryCatch(
            await ReturnToWarehouseService.returnToWarehouse(data)
                .then((respond) => {
                    if(respond){
                        return res.status(201).json({msg: 'Successfully Updated'});
                    }
                    else{
                        return res.status(401).json({msg: 'Return Amount is not enough'});
                    }
                }).catch((err)=>{{
                    console.error(err.message)
                    next(err);
                }})
        )
    }

}

module.exports = StockController;