
const UserError = require('../exceptions/user_exceptions');

const isAdmin = (req, res, next) => {
  if(req.user && req.user.is_admin ){
    next();
  }
  else{
    return next (UserError.UnauthorizedError());
  }
}


module.exports = isAdmin