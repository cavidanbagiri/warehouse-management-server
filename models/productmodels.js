'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductModels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ProductVariantModels, CategoryModels, ProductImagesModels}) {
      this.belongsTo(CategoryModels, {foreignKey: 'categoryId'});
      this.hasMany(ProductVariantModels, {foreignKey: 'productId'});
      this.hasMany(ProductImagesModels, {foreignKey: 'productId'});
      // define association here
    }
  }
  ProductModels.init({
    product_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    sku: {
      type: DataTypes.CHAR(10),
      allowNull: true
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

  }, {
    sequelize,
    tableName: 'ProductModels',
    modelName: 'ProductModels',
  });
  return ProductModels;
};