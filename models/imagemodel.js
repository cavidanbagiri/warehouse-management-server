'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ImageModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ProductImagesModel}) {
      this.hasMany(ProductImagesModel, {foreignKey: 'imgId'});
    }
  }
  ImageModel.init({
    image_url: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    tableName: 'ImageModel',
    modelName: 'ImageModel',
  });
  return ImageModel;
};