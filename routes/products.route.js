const { Router } = require('express');
const { viewProducts, productsPost, productsPut, productsDelete } = require('../controllers/products.controller');

const routerProduct = Router();

routerProduct.get('', viewProducts);
routerProduct.post('', productsPost);
routerProduct.put('/:id', productsPut);
routerProduct.delete('/:id', productsDelete);

module.exports = routerProduct;
