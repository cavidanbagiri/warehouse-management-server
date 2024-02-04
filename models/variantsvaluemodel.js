'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VariantsValueModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({VariantsModel, ProductVariantModel}) {
      this.belongsTo(VariantsModel, {foreignKey: 'variantsId'});
      this.hasMany(ProductVariantModel, {foreignKey: 'variantsValueId'});
    }
  }
  VariantsValueModel.init({
    variant_value: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'VariantsValueModel',
    tableName: 'VariantsValueModel',
  });
  return VariantsValueModel;
};