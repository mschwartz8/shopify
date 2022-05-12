const router = require('express').Router();
const {
    models: {Inventory}
} = require("../db")

// matches GET requests to /api/products/
router.get('/', async (req, res, next) => {

    try {
        const products = await Inventory.findAll();
        res.json(products)
    } catch(err){
        next(err)
    }
});

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

module.exports = router;