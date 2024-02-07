'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductImagesModels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ProductModels, ImageModels}) {
      this.belongsTo(ProductModels, {foreignKey: 'productId'});
      this.belongsTo(ImageModels, {foreignKey: 'imgId'});
    }
  }
  ProductImagesModels.init({
    productId: DataTypes.INTEGER,
    imgId: DataTypes.INTEGER
  }, {
    sequelize,
    tableName: 'ProductImagesModels',
    modelName: 'ProductImagesModels',
  });
  return ProductImagesModels;
};