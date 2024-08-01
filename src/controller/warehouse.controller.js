const { ReceiveWarehouseService, 
    FetchWarehouseDataService,
    FilterWarehouseDataService,
    GetPOWarehouseService,
    UpdatePOWarehouseService,
    FetchSelectedItemsService,
    ReceiveToStockService
} = require("../services/warehouse.service")
const tryCatch = require("../utils/tryCatch");


class WarehouseController {

    static async receiveMaterial(req, res, next) {
        const data = req.body;
        for(let i of data.table_data){
            i.companyId = data.default_data.companyId;
            i.orderedId = data.default_data.orderedId;
            i.document = data.default_data.document;
            i.currency = data.default_data.currency.toLowerCase();
            i.createdById = req.user.id;
        }

        tryCatch(
            await ReceiveWarehouseService.receiveMaterial(data.table_data)
                .then((respond) => {
                    if(respond){
                        return res.status(201).json(respond);
                    }
                    else{
                        return res.status(500).json({msg: 'Cant Add Stock'});
                    }
                })
                .catch((err) => {
                    next(err);
                })
        )
    }

    static async fetchWarehouseData(req, res, next){
        const projectId = req.params.projectId;
        tryCatch(
            await FetchWarehouseDataService.fetchWarehouseData(projectId)
                .then((respond) => {
                    return res.status(200).json(respond);
                })
                .catch((err) => {
                    console.log('fetch warehouse error : ', err);
                    next(err);
                })
        )
    }

    static async getPOById(req, res, next){
        const id = req.params.id
        tryCatch(
            await GetPOWarehouseService.getPOById(id)
            .then((respond) => {
                return res.status(200).json(respond);
            })
            .catch((err) => {
                next(err);
            })
        )
    }

    static async updatePo(req, res, next){
        const id = req.params.id;
        const data = req.body;
        tryCatch(
            await UpdatePOWarehouseService.updatePo(id, data)
            .then((respond) => {
                return res.status(201).json(respond);
            })
            .catch((err) => {
                console.log('update error : ', err);
                next(err);
            })
        )
    }

    static async updateCertOrPassportById(req, res, next){
        console.log('update cert of passport is working');
        const data = req.body;
        tryCatch(
            await UpdatePOWarehouseService.updateCertOrPassportById(data)
                .then((respond) => {
                    return res.status(201).json(respond);
                })
                .catch((err) => {
                    next(err);
                })
        )
    }


    static async getTypeCount(req, res, next){
        const projectId = req.params.projectId;
        tryCatch(
            await FetchWarehouseDataService.getTypeCount(projectId)
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

    static async fetchSelectedItemsById(req, res, next){
        const data = req.body;
        tryCatch(
            await FetchSelectedItemsService.fetchSelectedItemsById(data)
                .then((respond)=>{
                    return res.status(200).json(respond);
                })
                .catch((err) => {
                    console.log('get selected items error : ', err);
                    next(err)
                })
        )
    }

    static async receiveToStock(req, res, next){
        const data = req.body;
        data.userId = req.user.id;
        setTimeout(async ()=>{
            tryCatch(
                await ReceiveToStockService.receiveToStock(data)
                    .then((respond)=>{
                        if(respond){
                            return res.status(201).json({msg: 'Successfully received to stock'});
                        }
                        else{
                            return res.status(400).json({msg: respond});
                        }
                    })
                    .catch((err) => {
                        console.log('get selected items error : ', err);
                        next(err)
                    })
            )
        },3000)
    }

}

module.exports = WarehouseController