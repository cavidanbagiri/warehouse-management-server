'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('AreaModels',{
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
    await queryInterface.addConstraint('AreaModels',{
      fields: ['groupId'],
      type: 'foreign key',
      name: 'groupId',
      references: {
        table: 'GroupModels',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    await queryInterface.addConstraint('AreaModels',{
      fields: ['stockId'],
      type: 'foreign key',
      name: 'stockId',
      references: {
        table: 'StockModels',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('AreaModels', 'createdById');
    await queryInterface.removeConstraint('AreaModels', 'groupId');
    await queryInterface.removeConstraint('AreaModels', 'stockId');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
