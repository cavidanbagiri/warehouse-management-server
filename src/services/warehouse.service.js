
const { WarehouseModels } = require ('../../models');

class ReceiveWarehouseService {

    static async receiveMaterial(data){
        // for(let i of data){
        //     for(let [key , value] of Object.entries(i)){
        //         console.log('key : ', key);
        //         console.log('value : ', value);
        //     }
        // }
        // console.log('data is : ', data);
        for(let i of data){
            // await WarehouseModels.create(i);
            console.log('some');
        }
        
        return data;
    }



}

module.exports = {
    ReceiveWarehouseService,
}