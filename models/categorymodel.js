'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CategoryModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ProductModel}) {
      this.hasMany(ProductModel, {foreignKey: 'categoryId'})
      // define association here
    }
  }
  CategoryModel.init({
    category_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'CategoryModel',
    modelName: 'CategoryModel',
  });
  return CategoryModel;
};