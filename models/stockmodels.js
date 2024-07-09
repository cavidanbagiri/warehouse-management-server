'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StockModels extends Model {

    static associate({WarehouseModels, UserModels, AreaModels}) {
      this.belongsTo(WarehouseModels, {foreignKey: 'warehouseId'});
      this.belongsTo(UserModels, {foreignKey: 'createdById'});
      this.hasMany(AreaModels, {foreignKey: 'stockId'});
    }

  }
  StockModels.init({
    qty: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    stock: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    serial_number: {
      type: DataTypes.STRING,
      allowNull: true
    },
    material_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
  }, {
    sequelize,
    modelName: 'StockModels',
    tableName: 'StockModels',
  });
  return StockModels;
};