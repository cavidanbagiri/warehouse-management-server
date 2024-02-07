'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductVariantModels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({VariantsValueModels, ProductModels}) {
      this.belongsTo(VariantsValueModels, {foreignKey: 'variantsValueId'});
      this.belongsTo(ProductModels, {foreignKey: 'productId'});
    }
  }
  ProductVariantModels.init({
    
  }, {
    sequelize,
    modelName: 'ProductVariantModels',
    tableName: 'ProductVariantModels',
  });
  return ProductVariantModels;
};