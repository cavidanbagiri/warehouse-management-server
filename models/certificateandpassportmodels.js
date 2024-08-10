'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CertificateAndPassportModels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({WarehouseModels, UserModels}) {
      // define association here
      this.belongsTo(UserModels, {
        foreignKey: 'createdById',
      })
      this.belongsTo(WarehouseModels, {
        foreignKey: 'warehouseId',
      })
    }
  }
  CertificateAndPassportModels.init({
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    filename:{
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    tableName: 'CertificateAndPassportModels',
    modelName: 'CertificateAndPassportModels',
  });
  return CertificateAndPassportModels;
};