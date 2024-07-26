'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProjectModels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({UserModels, WarehouseModels, OrderedModels}) {
      this.hasOne(UserModels, {foreignKey:'projectId'});
      this.hasOne(WarehouseModels, {foreignKey: 'projectId'});
      this.hasOne(OrderedModels, {foreignKey: 'projectId'});
    }
  }
  ProjectModels.init({
    project_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'ProjectModels',
    tableName: 'ProjectModels',
  });
  return ProjectModels;
};