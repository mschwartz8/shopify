const Sequelize = require("sequelize");
const db = require("../db");

const Products = db.define("products", {
  productQuantity: {
    type: Sequelize.INTEGER,
  },
  itemsPriceTotal: {
    type: Sequelize.DECIMAL,
  },
});

module.exports = Products;
