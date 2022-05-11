const router = require('express').Router();

// matches GET requests to /api/products/
router.get('/', (req, res, next) => {
    res.send('products here')
});

module.exports = router;