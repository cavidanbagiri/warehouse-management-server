
const tryCatch  = require('../utils/tryCatch');
const { FetchAreaService, FilterAreaDataService } = require('../services/area.service');

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

}   

module.exports = AreaController