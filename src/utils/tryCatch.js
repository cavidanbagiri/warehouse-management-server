
const tryCatch = (controller) => async(req, res, next) => {
  try{
    controller(req, res, next);
  }
  catch(err){
    next(err);
  }
}


module.exports = tryCatch