const Sequelize = require("sequelize");
const connection = "postgres://ivan:password@localhost:5432/shop_dev";

const sequelize = new Sequelize(connection);

module.exports = sequelize;