const UploadUserImageService = require("../services/profile.service")
const tryCatch = require("../utils/tryCatch")


class ProfileController{


    static async uploadProfileImage(req, res, next) {

        console.log('image is uploaded');

        const file = req.file;
        const user_id = req.user.id;
        tryCatch(
            await UploadUserImageService.uploadProfileImage(file, user_id)
                .then((respond) => {
                    return res.status(201).json(respond);
                })
                .catch((err) => {
                    next(err);
                })
        )

    }

}

module.exports = ProfileController