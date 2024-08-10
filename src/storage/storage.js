
let EasyYandexS3 = require('easy-yandex-s3').default;

let s3 = new EasyYandexS3({
    auth: {
        accessKeyId: process.env.YANDEX_STORAGE_IDENTIFICATION_KEY,
        // accessKeyId: "YCAJE8vJiY2Iuxfg2Ci7gvxmw",
        secretAccessKey: process.env.YANDEX_STORAGE_SECRET_KEY,
        // secretAccessKey: "YCPwUDQFJrzv3Mm3uRKtaGP4kdFivMO8bq5WJbM6",
    },
    Bucket: process.env.YANDEX_STORAGE_BUCKET,
    // Bucket: "ustay-warehouse-management",
    debug: true,
});


module.exports = s3;