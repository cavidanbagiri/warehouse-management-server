'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VariantsModels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({VariantsValueModels}) {
      this.hasMany(VariantsValueModels, {foreignKey: 'variantsId'});
    }
  }
  VariantsModels.init({
    variant_name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'VariantsModels',
    tableName: 'VariantsModels',
  });
  return VariantsModels;
};