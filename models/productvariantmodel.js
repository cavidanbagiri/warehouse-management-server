'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductVariantModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({VariantsValueModel, ProductModel}) {
      this.belongsTo(VariantsValueModel, {foreignKey: 'variantsValueId'});
      this.hasMany(ProductModel, {foreignKey: 'productVariantId'})
    }
  }
  ProductVariantModel.init({
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
    }
  }, {
    sequelize,
    modelName: 'ProductVariantModel',
    tableName: 'ProductVariantModel',
  });
  return ProductVariantModel;
};