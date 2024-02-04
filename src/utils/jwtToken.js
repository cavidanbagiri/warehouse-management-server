
const JWT = require('jsonwebtoken');
const { TokenModel } = require('../../models/index.js');

class TokenService{

  static generateToken = (payload) => {

    // Generate Token
    const access_token = JWT.sign(payload, process.env.JWT_ACCESS_TOKEN, {expiresIn:'1m'});
    
    // Refresh Token
    const refresh_token = JWT.sign(payload, process.env.JWT_REFRESH_TOKEN, {expiresIn:'60d'});
  
    return {
      access_token,
      refresh_token
    }
  
  }
  
  static saveToken = async (user_id, refresh_token) => {
  
    const token_data = await TokenModel.findOne({
      where:{
        user_id: user_id
      }
    });
  
    if(token_data){
      token_data.refresh_token = refresh_token;
      return token_data.save();
    }
  
    const token = await TokenModel.create({
      user_id: user_id,
      refresh_token: refresh_token
    });
    

    return token;
  
  }

  static async deleteToken(refresh_token){
    const token_data = await TokenModel.destroy({
      where:{
        refresh_token: refresh_token
      }
    });
    return token_data;
  }

  static validateAccessToken(token) {
    try{
      const user_data = JWT.verify(token, process.env.JWT_ACCESS_TOKEN);
      return user_data;
    }
    catch(err){
      return null;
    }
  }

  static validateRefreshToken(token) {
    try{
      const user_data = JWT.verify(token, process.env.JWT_REFRESH_TOKEN);
      return user_data;
    }
    catch(err){
      return null;
    }
  }

  static findToken(refresh_token){

    const token_data = TokenModel.findOne({
      where:{
        refresh_token: refresh_token
      }
    })
    return token_data;
  }

}

module.exports = TokenService;