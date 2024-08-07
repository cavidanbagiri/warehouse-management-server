'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('ServiceMaterialModels', {
      fields: ['createdById'],
      type: 'foreign key',
      name: 'createdById',
      references: {
        table: 'UserModels',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
    await queryInterface.addConstraint('ServiceMaterialModels', {
      fields: ['stockId'],
      type: 'foreign key',
      name: 'stockId',
      references: {
        table: 'StockModels',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('ServiceMaterialModels', 'createdById')
    await queryInterface.removeConstraint('ServiceMaterialModels', 'stockId')
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
