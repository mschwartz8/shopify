const router = require('express').Router();
const {
    models: {Inventory}
} = require("../db")

// matches GET requests to /api/products/
router.get('/', async (req, res, next) => {

    try {
        const products = await Inventory.findAll();
        console.log(products, 'products')
        res.json(products)
    } catch(err){
        next(err)
    }
});

module.exports = router;