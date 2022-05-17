const db = require('./db')

const Inventory = require('./models/Inventory');
const Warehouse = require('./models/Warehouse');
const Products = require('./models/Products')

Inventory.belongsToMany(Warehouse, { through: Products})
Warehouse.belongsToMany(Inventory, { through: Products})

module.exports = {
    db,
    models: {
        Inventory,
        Warehouse,
        Products
        },
}
