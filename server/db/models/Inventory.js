const Sequelize = require('sequelize');
const db = require('../db');

const Inventory = db.define('inventory', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    quantity: {
        type: Sequelize.INTEGER
    },
    price: {
        type: Sequelize.DECIMAL
    },
    description: {
        type: Sequelize.TEXT
    },
    imageURL: {
        type: Sequelize.STRING,
        defaultValue:
        "https://m.media-amazon.com/images/I/51fYGd3BdiL._AC_UL640_FMwebp_QL65_.jpg"
    },

});

module.exports = Inventory;