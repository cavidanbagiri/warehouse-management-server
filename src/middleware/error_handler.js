
const UserError = require('../exceptions/user_exceptions');

const error_handler = (err, req, res, next) => {
  console.log('erorr hangle work');
  if(err instanceof UserError){
  console.log('erorr hangle work if');
    return res.status(err.status).json({msg: err.message, error:err.error});
  }
  console.log('erorr hangle work then');

  return res.status(500).send(err.message);

}

module.exports = error_handler;
