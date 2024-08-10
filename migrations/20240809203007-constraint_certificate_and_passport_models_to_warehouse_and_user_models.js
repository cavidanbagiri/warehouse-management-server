'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('CertificateAndPassportModels', {
      fields: ['createdById'],
      type: 'foreign key',
      name: 'createdById',
      references: {
        table: 'UserModels',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }),
    await queryInterface.addConstraint('CertificateAndPassportModels', {
      fields: ['warehouseId'],
      type: 'foreign key',
      name: 'warehouseId',
      references: {
        table: 'WarehouseModels',
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
    await queryInterface.removeConstraint('CertificateAndPassportModels', 'createdById')
    await queryInterface.removeConstraint('CertificateAndPassportModels', 'warehouseId')
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
