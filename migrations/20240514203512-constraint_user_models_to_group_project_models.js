'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('UserModels',{
      fields: ['projectId'],
      type: 'foreign key',
      name: 'projectId',
      references: {
        table: 'ProjectModels',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    await queryInterface.addConstraint('UserModels',{
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
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('UserModels','projectId');
    await queryInterface.removeConstraint('UserModels','groupId');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
