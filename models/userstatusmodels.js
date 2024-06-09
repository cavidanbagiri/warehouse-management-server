'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserStatusModels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({UserModels}) {
      // define association here
      this.hasOne(UserModels, {foreignKey:'userStatusId'});
    }
  }
  UserStatusModels.init({
    status_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status_code: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'UserStatusModels',
    modelName: 'UserStatusModels',
  });
  return UserStatusModels;
};