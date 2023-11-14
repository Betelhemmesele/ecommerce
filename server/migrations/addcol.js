// 'use strict';
// /** @type {import('sequelize-cli').Migration} */

 module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.addColumn('users', 'role', {
        type: Sequelize.STRING,
        defaultValue: 'buyer',
        allowNull: false,
      });
      await queryInterface.addColumn('products', 'discount', {
        type: Sequelize.FLOAT,
        allowNull: true,
      });
      await queryInterface.addColumn('products', 'content', {
        type: Sequelize.TEXT,
      });
      await queryInterface.addColumn('products', 'shop', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      });
      await queryInterface.addColumn('products', 'startsAt', {
        type: Sequelize.DATE,
        allowNull: true,
      });
      await queryInterface.addColumn('products', 'endsAt', {
        type: Sequelize.DATE,
        allowNull: true,
      });
      await queryInterface.addColumn('products', 'userId', {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
  },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.removeColumn('users', 'role');
      await queryInterface.removeColumn('products', 'discount');
      await queryInterface.removeColumn('products', 'content');
      await queryInterface.removeColumn('products', 'shop');
      await queryInterface.removeColumn('products', 'startsAt');
      await queryInterface.removeColumn('products', 'endsAt');
      await queryInterface.removeColumn('products', 'userId');
  
    },
};