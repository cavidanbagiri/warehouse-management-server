
var CryptoJS = require("crypto-js");

const hashPassword = (password) => {

  const hashing_password = CryptoJS.SHA256(password, process.env.HASH_SECRET_KEY).toString();

  return hashing_password;

}


module.exports = hashPassword;