'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('UserModels', 'userStatusId', {
      type: Sequelize.INTEGER,
    })
    await queryInterface.addConstraint('UserModels',{
      fields: ['userStatusId'],
      type: 'foreign key',
      name: 'userStatusId',
      references: {
        table: 'UserStatusModels',
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
    await queryInterface.removeColumn('UserModels', 'userStatusId' );
    // await queryInterface.removeConstraint('UserModels', 'userStatusId');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
