'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('ProductImagesModels', {
      fields: ['productId'],
      type: 'foreign key',
      name: 'productId',
      references: { //Required field
        table: 'ProductModels',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    await queryInterface.addConstraint('ProductImagesModels', {
      fields: ['imgId'],
      type: 'foreign key',
      name: 'imgId',
      references: { //Required field
        table: 'ImageModels',
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
    await queryInterface.removeConstraint('ProductImagesModels', 'productId')
    await queryInterface.removeConstraint('ProductImagesModels', 'productId')
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
