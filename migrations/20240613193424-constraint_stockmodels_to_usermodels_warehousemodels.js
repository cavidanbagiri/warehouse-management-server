'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('StockModels',{
      fields: ['createdById'],
      type: 'foreign key',
      name: 'createdById',
      references: {
        table: 'UserModels',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    await queryInterface.addConstraint('StockModels',{
      fields: ['warehouseId'],
      type: 'foreign key',
      name: 'warehouseId',
      references: {
        table: 'WarehouseModels',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('StockModels', 'warehouseId');
    await queryInterface.removeConstraint('StockModels', 'createdById');
  }
};
