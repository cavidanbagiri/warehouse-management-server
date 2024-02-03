'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TokenModel extends Model {
    static associate({UserModel}) {
      this.belongsTo(UserModel, {foreignKey:'user_id'})
    }
  }
  TokenModel.init({
    refresh_token: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'TokenModel',
  });
  return TokenModel;
};