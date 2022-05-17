const router = require('express').Router();
const {
    models: {Inventory, Warehouse}
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

router.put('/:id', async (req, res, next) => {
    try {
        const product = await Inventory.findByPk(req.params.id);
        res.send(
            await product.update({
                name: req.body.name,
                quantity: req.body.quantity,
                price: req.body.price,
                description: req.body.description,
                imageURL: req.body.imageURL
            })
        )
    } catch (err) {
        next(err)
    }

})

// if on the front end you end up doing a drop down with warehouse options
// once you choose one of those, it will assign it by updating the foreign key warehouseId
// it will find the warehouse by name & then add warehouseId
// router.put('/:id/assignWarehouse', async (req, res, next) => {
//     try {
//         const product = await Inventory.findByPk(req.params.id);
//         const warehouse = await Warehouse.findOne({where: {
//             location: req.body.location}
//         })
//         res.send(
//             await product.update({
//                 location: warehouse.id
//             })
//         )
//     } catch (err) {
//         next(err)
//     }

// })


module.exports = router;