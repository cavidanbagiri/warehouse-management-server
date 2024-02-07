'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TokenModels extends Model {
    static associate({UserModels}) {
      this.belongsTo(UserModels, {foreignKey:'user_id'})
    }
  }
  TokenModels.init({
    refresh_token: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'TokenModels',
    tableName: 'TokenModels',
  });
  return TokenModels;
};