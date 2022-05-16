const db = require('./db')

const Inventory = require('./models/Inventory');
const Warehouse = require('./models/Warehouse');



module.exports = {
    db,
    models: {
        Inventory,
        Warehouse
    },
}