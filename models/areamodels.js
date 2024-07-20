'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AreaModels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({UserModels, GroupModels, StockModels}) {
      this.belongsTo(UserModels, {foreignKey: 'createdById'});
      this.belongsTo(GroupModels, {foreignKey: 'groupId'});
      this.belongsTo(StockModels, {foreignKey: 'stockId'});
    }
  }
  AreaModels.init({
    qty: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    serial_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    material_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    card_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    providerType: {
      type: DataTypes.ENUM('Consumption', 'Debit'),
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'AreaModels',
    tableName: 'AreaModels',
  });
  return AreaModels;
};