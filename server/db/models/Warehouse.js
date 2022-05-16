const Sequelize = require('sequelize');
const db = require('../db');

const Warehouse = db.define('warehouse', {
    location: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

module.exports = Warehouse;