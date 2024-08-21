'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // await queryInterface.addConstraint('WarehouseModels',{
    //   fields: ['orderedId'],
    //   type: 'foreign key',
    //   name: 'orderedId',
    //   references: {
    //     table: 'OrderedModels',
    //     field: 'id'
    //   },
    //   onDelete: 'cascade',
    //   onUpdate: 'cascade'
    // });
    await queryInterface.addConstraint('WarehouseModels',{
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
    await queryInterface.addConstraint('WarehouseModels',{
      fields: ['companyId'],
      type: 'foreign key',
      name: 'companyId',
      references: {
        table: 'CompanyModels',
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
    await queryInterface.removeConstraint('WarehouseModels', 'companyId');
    // await queryInterface.removeConstraint('WarehouseModels', 'orderedId');
    await queryInterface.removeConstraint('WarehouseModels', 'projectId');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
