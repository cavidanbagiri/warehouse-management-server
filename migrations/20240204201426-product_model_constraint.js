'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.addConstraint('VariantsValueModels', {
      fields: ['variantsId'],
      type: 'foreign key',
      name: 'variantsId',
      references: { //Required field
        table: 'VariantsModels',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

    await queryInterface.addConstraint('ProductVariantModels', {
      fields: ['variantsValueId'],
      type: 'foreign key',
      name: 'variantsValueId',
      references: { //Required field
        table: 'VariantsValueModels',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

    await queryInterface.addConstraint('ProductModels', {
      fields: ['productVariantId'],
      type: 'foreign key',
      name: 'productVariantId',
      references: { //Required field
        table: 'ProductVariantModels',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

    await queryInterface.addConstraint('ProductModels', {
      fields: ['categoryId'],
      type: 'foreign key',
      name: 'categoryId',
      references: { //Required field
        table: 'CategoryModels',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });



  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('VariantsValueModels', 'variantsId')
    await queryInterface.removeConstraint('ProductVariantModels', 'variantsValueId')
    await queryInterface.removeConstraint('CategoryModels', 'categoryId')
    await queryInterface.removeConstraint('ProductModels', 'productVariantId')
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
