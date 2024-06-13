'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WarehouseModels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({UserModels, CompanyModels, ProjectModels, StockModels}) {
      // define association here
      this.belongsTo(UserModels, {foreignKey: 'orderedId'});
      this.belongsTo(CompanyModels, {foreignKey: 'companyId'});
      this.belongsTo(ProjectModels, {foreignKey: 'projectId'});
      this.belongsTo(UserModels, {foreignKey: 'createdById'});
      this.belongsTo(StockModels, {foreignKey: 'warehouseId'});
    }
  }
  WarehouseModels.init({
    document: {
      type: DataTypes.STRING,
      allowNull: true
    },
    material_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    qty: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: true
    },
    po: {
      type: DataTypes.STRING,
      allowNull: true
    },
    certificate: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    passport: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    orderedId: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    projectId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    companyId: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    createdById: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'WarehouseModels',
    tableName: 'WarehouseModels',
  });
  return WarehouseModels;
};