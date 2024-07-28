'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MaterialCodeModels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({WarehouseModels}) {
      this.hasOne(WarehouseModels, {foreignKey: 'materialCodeId'});
      // define association here
    }
  }
  MaterialCodeModels.init({
    material_description: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue('material_description').slice(0, 1).toUpperCase() + this.getDataValue('material_description').slice(1);
      }
    },
    material_code: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'MaterialCodeModels',
  });
  return MaterialCodeModels;
};