

const tryCatch = require("../utils/tryCatch");
const {FetchStockService, FilterStockDataService} = require("../services/stock.service");

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
                    console.log('get type error : ', err);
                    next(err);
                })
        )
    }

}

module.exports = StockController;