
const UserError = require('../exceptions/user_exceptions');
const { UserServiceLogin, UserServiceRegister, UserServiceLogout, UserServiceRefresh, UserServiceFetchUsers } = require('../services/user.service');

const tryCatch = require('../utils/tryCatch');

const {validationResult} = require('express-validator');

class UserController{ 

  
  // User Register
  static async userRegister(req, res, next) {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return next(UserError.BadRequest("Validation Error", errors.errors));
    }
    const user_data = {
      email: req.body.email,
      password: req.body.password,
      is_admin: req.body.is_admin,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      address: req.body.address,
      phone_number: req.body.phone_number,
      projectId: req.body.projectId,
      groupId: req.body.groupId,
    }
    tryCatch(
      UserServiceRegister.userRegister(user_data)
      .then((respond)=>{
        res.cookie('refreshToken', respond.refresh, {maxAge:60 * 24 * 60 * 60 * 1000 , httpOnly: true});
        return res.status(200).send(respond);
      })
      .catch(err=>{
        console.log('error is : ', err);
        next(err);
      })
    )

  }

  // User Login
  static async userLogin(req, res, next) {
    const user_data = {
      email: req.body.email,
      password: req.body.password,
    }
    console.log('user login func is working');
    tryCatch(
      UserServiceLogin.userLogin(user_data)
      .then((respond)=>{
        res.cookie('refreshToken', respond.refresh, {maxAge:60 * 24 * 60 * 60 * 1000 , httpOnly: true});
        return res.status(200).send(respond);
      }).catch(err=>{
        next(err);
      })
    );
  }

  // User Logout
  static async userLogout(req, res, next){
    const {refreshToken} = req.cookies;
    const token = UserServiceLogout.userLogout(refreshToken);
    res.clearCookie('refreshToken');
    return res.send(token);
  }


  // Refresh Token
  static async refresh(req, res, next) {
    const {refreshToken} = req.cookies;
    if(refreshToken){

      const user_data = await UserServiceRefresh.refresh(refreshToken);
      res.cookie('refreshToken', user_data.refresh, {maxAge:60 * 24 * 60 * 60 * 1000 , httpOnly: true});
      return res.status(200).send(user_data);
    }
    else{
      return res.status(404).send('user not login');
    }
  }


  // fetch All Users
  static async fetchUsers(req, res, next) {
    tryCatch(
      await UserServiceFetchUsers.fetchUsers()
      .then((respond)=>{
        return res.status(200).send(respond);
      }).catch(err=>{
        next(err);
      })
    )
  }

}


module.exports = UserController