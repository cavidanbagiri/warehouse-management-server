
let EasyYandexS3 = require('easy-yandex-s3').default;

let s3 = new EasyYandexS3({
    auth: {
        accessKeyId: process.env.YANDEX_STORAGE_IDENTIFICATION_KEY,
        secretAccessKey: process.env.YANDEX_STORAGE_SECRET_KEY,
    },
    Bucket: process.env.YANDEX_STORAGE_BUCKET,
    debug: true,
});


module.exports = s3;