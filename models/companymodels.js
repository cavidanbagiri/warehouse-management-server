'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CompanyModels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({WarehouseModels}) {
      // define association here
      this.hasOne(WarehouseModels, {foreignKey: 'companyId'});
    }
  } 
  CompanyModels.init({
    company_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'CompanyModels',
    tableName: 'CompanyModels',
  });
  return CompanyModels;
};