

class UserError extends Error{

  status;
  errors;

  constructor(status, message, errors=[]){
    super(message);
    this.status = status;
    this.error = errors
  }

  static UserNotFoundError(){
    return new UserError(400, "Boyle bir kullanici bulunamadi");
  }

  static UnauthorizedError(){
    return new UserError(400, "Unauthorized Error");
  }

  static UserAlreadyRegisterError(){
    return new UserError(400, "Bu kullanıcı zaten kayıtlı");
  }
  
  static BadRequest(message, errors){
    return new UserError(400, message, errors);
  }

}

module.exports = UserError