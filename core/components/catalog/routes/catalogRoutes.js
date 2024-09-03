// core/components/catalog/routes/catalogRoutes.js

const express = require('express');
const router = express.Router();
const catalogController = require('../controllers/catalogController');

router.get('/products', catalogController.getProducts);
router.post('/products', catalogController.createProduct);

module.exports = router;
