'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VariantsValueModels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({VariantsModels, ProductVariantModels}) {
      this.belongsTo(VariantsModels, {foreignKey: 'variantsId'});
      this.hasMany(ProductVariantModels, {foreignKey: 'variantsValueId'});
    }
  }
  VariantsValueModels.init({
    variant_value: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'VariantsValueModels',
    tableName: 'VariantsValueModels',
  });
  return VariantsValueModels;
};