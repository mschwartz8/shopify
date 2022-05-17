const router = require('express').Router();
const {
    models: {Warehouse}
} = require("../db")


// create a new warehouse
router.post('/', async (req, res, next) => {
    try {
     res.status(201).send(await Warehouse.create({
        location: req.body.location
     }))
    } catch (err){
        next(err)
    }
})

module.exports = router;