'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductImagesModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ProductModel, ImageModel}) {
      this.belongsTo(ProductModel, {foreignKey: 'productId'});
      this.belongsTo(ImageModel, {foreignKey: 'imgId'});
    }
  }
  ProductImagesModel.init({
    productId: DataTypes.INTEGER,
    imgId: DataTypes.INTEGER
  }, {
    sequelize,
    tableName: 'ProductImagesModel',
    modelName: 'ProductImagesModel',
  });
  return ProductImagesModel;
};