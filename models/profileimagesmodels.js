'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProfileImagesModels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({UserModels}) {
      // define association here
      this.belongsTo(UserModels, {foreignKey:'userId'});
    }
  }
  ProfileImagesModels.init({
    location: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'ProfileImagesModels',
    modelName: 'ProfileImagesModels',
  });
  return ProfileImagesModels;
};