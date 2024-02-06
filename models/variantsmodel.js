'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VariantsModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({VariantsValueModel}) {
      this.hasMany(VariantsValueModel, {foreignKey: 'variantsId'});
    }
  }
  VariantsModel.init({
    variant_name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'VariantsModel',
    tableName: 'VariantsModels',
  });
  return VariantsModel;
};