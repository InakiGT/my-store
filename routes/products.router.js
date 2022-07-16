const express = require('express');
const ProductsService = require('../services/product.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('../schemas/product.schema');

const router = express.Router();
const service = new ProductsService();

router.get('/', async ( req, res, next ) => {
    try {
        const products = await service.find();
        res.status(200).json(products);
    } catch(err) {
        next(err);
    }
});

router.get("/:id",
    validatorHandler(getProductSchema, 'params'),
    async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await service.findOne(id);

        res.status(200).json(product);
    } catch(err) {
        next(err);
    }

});

router.post('/',
    validatorHandler(createProductSchema, 'body'),
    async ( req, res ) => {
    const body = req.body;
    const newProduct = await service.create(body);

    res.status(201).json(newProduct);
});

router.patch('/:id',
    validatorHandler(getProductSchema, 'params'),
    validatorHandler(updateProductSchema, 'body'),
    async ( req, res ) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const product = await service.update(id, body);

        res.json(product);
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
});

router.delete('/:id', async ( req, res ) => {
    const { id } = req.params;
    const rta = await service.delete(id);

    res.json(rta);
});

module.exports = router;
