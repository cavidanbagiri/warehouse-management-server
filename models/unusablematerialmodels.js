'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UnusableMaterialModels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({UserModels, StockModels}) {
      // define association here
      this.belongsTo(UserModels, {
        foreignKey: 'createdById',
      })
      this.belongsTo(StockModels, {
        foreignKey: 'stockId',
      })
    }
  }
  UnusableMaterialModels.init({
    comments: {
      type: DataTypes.STRING,
      allowNull: true
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
  }, {
    sequelize,
    tableName: 'UnusableMaterialModels',
    modelName: 'UnusableMaterialModels',
  });
  return UnusableMaterialModels;
};