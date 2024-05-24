const { ReceiveWarehouseService } = require("../services/warehouse.service")
const tryCatch = require("../utils/tryCatch");


class WarehouseController {

    static async receiveMaterial(req, res, next) {
        const data = req.body;
        // console.log(data);
        for(let i of data.table_data){
            i.companyId = data.default_data.companyId;
            i.orderedId = data.default_data.orderedId;
            i.document = data.default_data.document,
            i.currency = data.default_data.currency
        }
        console.log(data);
        tryCatch(
            await ReceiveWarehouseService.receiveMaterial(data.table_data)
                .then((respond) => {

                    return res.status(201).json(respond);
                })
                .catch((err) => {
                    console.log('Receive Mmaterial Error : ', err);
                    next(err);
                })
        )
    }

}

module.exports = WarehouseController