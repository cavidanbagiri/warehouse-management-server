
const UserError = require( "../exceptions/user_exceptions");
const TokenService = require( "../utils/jwtToken");


const authMiddleware = (req, res, next) => {
  try{
    const access_token = req.headers.authorization;
    if(!access_token){
      return next(UserError.UnauthorizedError());
    }
    
    const token = access_token.split(' ')[1];
    console.log('coming token is : ', token);
    if(!token){
      return next(UserError.UnauthorizedError());
    }
    const user_data = TokenService.validateAccessToken(token);
    
    if(!user_data){
      return next(UserError.UnauthorizedError());
    }

    req.user = user_data;
    next();

  }
  catch(err){
    return next (UserError.UnauthorizedError());
  }

} 


module.exports = authMiddleware;