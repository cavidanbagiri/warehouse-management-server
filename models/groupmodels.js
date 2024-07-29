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
    static associate({UserModels, AreaModels, OrderedModels}) {
      this.hasOne(UserModels, {foreignKey:'groupId'});
      this.hasOne(AreaModels, {foreignKey:'groupId'});
      this.hasOne(OrderedModels, {foreignKey:'groupId'});
    }
  }
  GroupModels.init({
    group_name: {
      type: DataTypes.STRING, 
      allowNull: false,
      get(){
        return this.getDataValue('group_name').slice(0,1).toUpperCase() + this.getDataValue('group_name').slice(1).toLowerCase();
      }
    }
  }, {
    sequelize,
    modelName: 'GroupModels',
    tableName: 'GroupModels',
  });
  return GroupModels;
};