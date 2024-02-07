'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.addColumn('ProductModels', 'sku', Sequelize.CHAR(10));
    await queryInterface.addColumn('ProductModels', 'price', Sequelize.DOUBLE);
    await queryInterface.addColumn('ProductModels', 'stock', Sequelize.INTEGER);
    await queryInterface.addColumn('ProductVariantModels', 'productId', Sequelize.INTEGER)

    await queryInterface.removeConstraint('ProductModels', 'productVariantId');
    await queryInterface.removeColumn('ProductModels', 'productVariantId')

    await queryInterface.addConstraint('ProductVariantModels', {
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

    /**
     * sku: {
        type: Sequelize.CHAR(10),
        allowNull: true
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      stock: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
