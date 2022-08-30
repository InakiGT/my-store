const express = require('express');
const ProductsService = require('../services/products.service');
const validatorHandler = require('../middlewares/validator.handler');
const { getCategorySchema, createCategorySchema, updateCategorySchema } = require('../schemas/category.schema');

const router = express.Router();
const service = new ProductsService();

router.get('/', async ( req, res, next ) => {
    try {
        const categories = await service.find();
        res.status(200).json(categories);
    } catch(err) {
        next(err);
    }
});

router.get("/:id",
    validatorHandler(getCategorySchema, 'params'),
    async (req, res, next) => {
    try {
        const { id } = req.params;
        const category = await service.findOne(id);

        res.status(200).json(category);
    } catch(err) {
        next(err);
    }
});

router.post('/',
    validatorHandler(createCategorySchema, 'body'),
    async ( req, res ) => {
    const body = req.body;
    const newCategory = await service.create(body);

    res.status(201).json(newCategory);
});

router.patch('/:id',
    validatorHandler(getCategorySchema, 'params'),
    validatorHandler(updateCategorySchema, 'body'),
    async ( req, res ) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const category = await service.update(id, body);

        res.json(category);
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
