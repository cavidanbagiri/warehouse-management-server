
const UserError = require('../exceptions/user_exceptions');

const error_handler = (err, req, res, next) => {

  if(err instanceof UserError){
    return res.status(err.status).json({msg: err.message, error:err.error});
  }

  return res.status(500).send(err.message);

}

module.exports = error_handler;
