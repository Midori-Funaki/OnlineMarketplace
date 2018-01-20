'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('Products', 'size', Sequelize.FLOAT);
    queryInterface.addColumn('Products', 'color', Sequelize.STRING);
    queryInterface.addColumn('Products', 'condition', Sequelize.STRING);
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Products', 'size');
    queryInterface.removeColumn('Products', 'color');
    queryInterface.removeColumn('Products', 'condition');
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
