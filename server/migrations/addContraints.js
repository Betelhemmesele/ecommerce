module.exports = {
  up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('product_reviews', 'userId', {
          allowNull: false,
          
          type: Sequelize.INTEGER,
          references: {
            model: 'users',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        });
      // await queryInterface.addConstraint('product_reviews', {
      //     fields: ['userId', 'productId'],
      //     type: 'unique',
      //     name: 'product_reviews_userId_productId_unique_constraint',
      //   });
  } ,
  async down (queryInterface,sequelize) {
   await queryInterface.removeConstraint('product_reviews', 'product_reviews_userId_productId_unique_constraint');
   await queryInterface.removeColumn('product_reviews', 'userId');

  },
}