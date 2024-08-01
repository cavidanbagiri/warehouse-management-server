
const { sequelize, UserModels , UserStatusModels} = require('../../models');

const hashPassword = require('../helpers/hash_password');

const TokenService = require('../utils/jwtToken');

const UserError = require('../exceptions/user_exceptions');

class UserServiceRegister{

  // User Register
  static async userRegister(user_data){

    const find_user = await this.#findUser(user_data);
    if(!find_user){

      // Hash Password
      const hashing_password = hashPassword(user_data.password);
      user_data.password = hashing_password;
      
      // Create New User In Database
      const new_user = await UserModels.create(user_data);
      // const new_user_data = {
      //   id: new_user.id,
      //   email: new_user.email
      // };

      // Generate Tokens
      //const tokens = TokenService.generateToken(new_user_data);
      
      // Save Refresh Token To Database
      //await TokenService.saveToken(new_user.id, tokens.refresh_token);

      // return {
      //   access: tokens.access_token,
      //   refresh: tokens.refresh_token,
      //   user: new_user_data
      // }
      return new_user
    } 
    else{
      throw UserError.UserAlreadyRegisterError(400, 'Email is Already Active')
    }

  }

  // Check User is available
  static async #findUser (user_data) {

    const user = await UserModels.findOne({
      where:{
        email:user_data.email
      }
    })
    if(user){
      return true;
    }
    return false;

  }

}


class UserServiceLogin{

  // User Login
  static async userLogin(user_data) {

    const find_user = await this.#findUser(user_data.email, user_data.password);

    if(find_user){
      const find_user_data = {
        id: find_user.id,
        email: find_user.email,
        is_admin: find_user.is_admin,
        status_code: find_user.dataValues.UserStatusModel.dataValues.status_code,
        projectId: find_user.projectId,
      }
      const tokens = TokenService.generateToken(find_user_data);

      // Save Refresh Token To Database
      await TokenService.saveToken(find_user_data.id, tokens.refresh_token);

      return {
        access: tokens.access_token,
        refresh: tokens.refresh_token,
        user: find_user_data
      }

    }
    else{
      throw UserError.UserNotFoundError();
    }

  }

  // Find User
  static async #findUser(email, password) {

    const find_user = await UserModels.findOne({
      where:{
        email: email,
      },
      include: {
        model: UserStatusModels,
        attributes: ['id', 'status_code', 'status_name']
      }
    });

    if(find_user){
      console.log(find_user.dataValues.UserStatusModel.dataValues);
      const hashing_password = hashPassword(password);
      if(find_user.password === hashing_password){
        return find_user
      }
    }
    else{
      return null;
    }
  }
}

// User Logout
class UserServiceLogout{

  static async userLogout (refresh_token) {
    const token = await TokenService.deleteToken(refresh_token);
    return token;
  }

}

// Refresh Token
class UserServiceRefresh{

  static async refresh(refresh_token){
    if(!refresh_token){
      throw UserError.UnauthorizedError();
    }

    const user_data = TokenService.validateRefreshToken(refresh_token);
    const token_from_data = TokenService.findToken(refresh_token);

    if(!user_data || !token_from_data ){
      throw UserError.UnauthorizedError();
    }

    const find_user = await UserModels.findOne({
      where:{
        id: user_data.id
      },
      include: {
        model: UserStatusModels,
        attributes: ['id', 'status_code', 'status_name']
      }
    });

    if(!find_user){
      throw new Error('User Not Found');
    }
    else{
      const find_user_data = {
        id: find_user.id,
        email: find_user.email,
        is_admin: find_user.is_admin,
        status_code: find_user.dataValues.UserStatusModel.dataValues.status_code,
        projectId: find_user.projectId,
      }
      const tokens = TokenService.generateToken(find_user_data);
      
      // Save Refresh Token To Database
      await TokenService.saveToken(find_user_data.id, tokens.refresh_token);
      
      return {
        access: tokens.access_token,
        refresh: tokens.refresh_token,
        user: find_user_data
      }
    }

  }
}

class UserServiceFetchUsers{

  static async fetchUsers(){

    const users = await UserModels.findAll();    return users;
  }

}



module.exports = {
  UserServiceLogin,
  UserServiceRegister,
  UserServiceLogout,
  UserServiceRefresh,
  UserServiceFetchUsers
}