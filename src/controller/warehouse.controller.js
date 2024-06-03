const { ReceiveWarehouseService, 
    FetchWarehouseDataService,
    FilterWarehouseDataService,
    GetPOWarehouseService,
    UpdatePOWarehouseService
} = require("../services/warehouse.service")
const tryCatch = require("../utils/tryCatch");


class WarehouseController {

    static async receiveMaterial(req, res, next) {
        const data = req.body;
        for(let i of data.table_data){
            i.companyId = data.default_data.companyId;
            i.orderedId = data.default_data.orderedId;
            i.document = data.default_data.document,
            i.currency = data.default_data.currency.toLowerCase()
        }
        tryCatch(
            await ReceiveWarehouseService.receiveMaterial(data.table_data)
                .then((respond) => {
                    return res.status(201).json(respond);
                })
                .catch((err) => {
                    next(err);
                })
        )
    }

    static async fetchWarehouseData(req, res, next){
        tryCatch(
            await FetchWarehouseDataService.fetchWarehouseData()
                .then((respond) => {
                    return res.status(200).json(respond);
                })
                .catch((err) => {
                    next(err);
                })
        )
    }

    static async getPOById(req, res, next){
        const id = req.params.id
        tryCatch(
            await GetPOWarehouseService.getPOById(id)
            .then((respond) => {
                // console.log('coming respond is : ', respond);
                return res.status(200).json(respond);
            })
            .catch((err) => {
                next(err);
            })
        )
    }

    static async updatePo(req, res, next){
        console.log('update is working');
        const id = req.params.id;
        const data = req.body;
        console.log('uid : ', id);
        console.log('data _> : ', data);
        tryCatch(
            await UpdatePOWarehouseService.updatePo(id, data)
            .then((respond) => {
                console.log('PO Updated : ', respond);
                return res.status(201).json(respond);
            })
            .catch((err) => {
                next(err);
            })
        )
    }


    static async getTypeCount(req, res, next){
        tryCatch(
            await FetchWarehouseDataService.getTypeCount()
                .then((respond) => {
                    return res.status(200).json(respond);
                })
                .catch((err) => {
                    console.log('get type error : ', err);
                    next(err);
                })
        )
    }

    static async filterWarehouseData(req, res, next){
        const filtered_query = req.query;
        console.log('filtered data : ', filtered_query);
        tryCatch(
            await FilterWarehouseDataService.filterWarehouseData(filtered_query)
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

module.exports = WarehouseController