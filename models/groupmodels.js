'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GroupModels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({UserModels}) {
      this.hasOne(UserModels, {foreignKey:'projectId'});
    }
  }
  GroupModels.init({
    group_name: {
      type: DataTypes.STRING, 
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'GroupModels',
    tableName: 'GroupModels',
  });
  return GroupModels;
};