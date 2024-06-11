'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('WarehouseModels', 'certificate', {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false
    })
    await queryInterface.addColumn('WarehouseModels', 'passport', {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false
    })
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('WarehouseModels', 'certificate');
    await queryInterface.removeColumn('WarehouseModels', 'passport');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
