const db = require('./db')

const Inventory = require('./models/Inventory');

module.exports = {
    db,
    models: {
        Inventory
    },
}