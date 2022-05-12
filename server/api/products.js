const router = require('express').Router();
const {
    models: {Inventory}
} = require("../db")

// get all the inventory items 
router.get('/', async (req, res, next) => {

    try {
        const products = await Inventory.findAll();
        res.json(products)
    } catch(err){
        next(err)
    }
});

// create a new Inventory item
router.post('/', async (req, res, next) => {
    try {
     res.status(201).send(await Inventory.create({
        name: req.body.name,
        quantity: req.body.quantity,
        price: req.body.price,
        description: req.body.description,
        imageURL: req.body.imageURL
     }))
    } catch (err){
        next(err)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const product = await Inventory.findByPk(req.params.id);
        await product.destroy();
        res.send(product)
    } catch (err) {
        next(err)
    }
})

module.exports = router;