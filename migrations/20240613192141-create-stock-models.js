'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('StockModels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      qty: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      stock: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      price: {
        type: Sequelize.DOUBLE,
        allowNull: true
      },
      serial_number: {
        type: Sequelize.STRING,
        allowNull: true
      },
      material_id: {
        type: Sequelize.STRING,
        allowNull: true
      },
      warehouseId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdById: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('StockModels');
  }
};