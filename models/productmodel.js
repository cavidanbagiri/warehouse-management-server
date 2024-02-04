'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ProductVariantModel, CategoryModel, ProductImagesModel}) {
      this.belongsTo(ProductVariantModel, {foreignKey: 'productVariantId'});
      this.belongsTo(CategoryModel, {foreignKey: 'categoryId'});
      this.hasMany(ProductImagesModel, {foreignKey: 'productId'});
      // define association here
    }
  }
  ProductModel.init({
    product_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },

  }, {
    sequelize,
    tableName: 'ProductModel',
    modelName: 'ProductModel',
  });
  return ProductModel;
};