'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      orderId: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      sellerShipAddress: {
        type: Sequelize.STRING
      },
      sellerShipAddress2: {
        type: Sequelize.STRING
      },
      sellerBillAddress: {
        type: Sequelize.STRING
      },
      sellerBillAddress2: {
        type: Sequelize.STRING
      },
      buyerShipAddress: {
        type: Sequelize.STRING,
        allowNull: false
      },
      buyerShipAddress2: {
        type: Sequelize.STRING
      },
      buyerBillAddress: {
        type: Sequelize.STRING,
        allowNull: false
      },
      buyerBillAddress2: {
        type: Sequelize.STRING
      },
      buyerId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      sellerId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Transactions');
  }
};