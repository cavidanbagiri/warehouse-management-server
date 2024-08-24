
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
      firstName: req.body.firstName.toLowerCase(),
      lastName: req.body.lastName.toLowerCase(),
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      projectId: req.body.projectId,
      groupId: req.body.groupId,
      userStatusId: req.body.userStatusId,
    }
    tryCatch(
      UserServiceRegister.userRegister(user_data)
      .then((respond)=>{
        // res.cookie('refreshToken', respond.refresh, {maxAge:60 * 24 * 60 * 60 * 1000 , httpOnly: true});
        return res.status(201).send(respond);
      })
      .catch(err=>{
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
    tryCatch(
      UserServiceLogin.userLogin(user_data)
      .then((respond)=>{
        res.cookie('refreshToken', respond.refresh, {maxAge:60 * 24 * 60 * 60 * 1000 , httpOnly: true, secure: true, sameSite: 'strict'});
        console.log('login token ___________>>>>>>>>>>>>> refreshtoken : ', respond.refresh);
        return res.status(200).send(respond);
      }).catch(err=>{
        next(err);
      })
    );
  }

  // User Logout
  static async userLogout(req, res, next){
    const {refreshToken} = req.cookies;
    if(!refreshToken){
      return res.status(404).send('Authentication Error');
    }
    else if(refreshToken){
      const token = await UserServiceLogout.userLogout(refreshToken);
      res.clearCookie('refreshToken');
      console.log('logout token ___________>>>>>>>>>>>>> refreshtoken : ', refreshToken);
      return res.json(token);
    }
    else{
      return res.status(404).send('Authentication Error');
    }
  }


  // Refresh Token
  static async refresh(req, res, next) {
    const {refreshToken} = req.cookies;
    if(refreshToken){
      const user_data = await UserServiceRefresh.refresh(refreshToken);

      res.cookie('refreshToken', user_data.refresh, {maxAge:60 * 24 * 60 * 60 * 1000 , httpOnly: true, secure: true, sameSite: 'strict'});
      return res.status(200).send(user_data);
    }
    else{
      return res.status(404).send('Boyle bir kullnici bulunamadi');
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
