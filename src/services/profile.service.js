
const {ProfileImagesModels} = require('../../models');

const s3 = require('../storage/storage');

class UploadUserImageService{


    static async uploadProfileImage(file, user_id) {
        
        let upload = await s3.Upload(
            {
                buffer: file.buffer,
            },
            '/user_profile_images/'
        );
        
        const result =  await ProfileImagesModels.create({
            location: upload.Location,
            userId: user_id
        })

        return upload.Location;

    }

}

module.exports = UploadUserImageService