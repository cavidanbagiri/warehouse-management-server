'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserModels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({TokenModels, ProjectModels, GroupModels, WarehouseModels, UserStatusModels, StockModels, AreaModels, UnusableMaterialModels, ServiceMaterialModels, CertificateAndPassportModels, ProfileImagesModels}) {
      this.hasOne(TokenModels, {foreignKey: 'user_id'});
      this.belongsTo(ProjectModels, {foreignKey: 'projectId'});
      this.belongsTo(GroupModels, {foreignKey: 'groupId'});
      this.belongsTo(UserStatusModels, {foreignKey: 'userStatusId'});
      this.hasOne(WarehouseModels, {foreignKey: 'orderedId'});
      this.hasOne(WarehouseModels, {foreignKey: 'createdById'});
      this.hasMany(StockModels, {foreignKey: 'createdById'});
      this.hasMany(AreaModels, {foreignKey: 'createdById'});
      this.hasMany(UnusableMaterialModels, {foreignKey: 'createdById'});
      this.hasMany(ServiceMaterialModels, {foreignKey: 'createdById'});
      this.hasMany(CertificateAndPassportModels, {foreignKey: 'createdById'});
      this.hasOne(ProfileImagesModels, {foreignKey: 'userId'});
    }
  }
  UserModels.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    userStatusId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
  }, {
    sequelize,
    tableName: 'UserModels',
    modelName: 'UserModels',
  });
  return UserModels;
};