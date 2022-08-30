const express = require('express');
const validationHandler = require('./../middlewares/validator.handler');
const OrderService = require('./../services/orders.service');
const {
    createOrderSchema,
    getOrderSchema,
    addItemSchema
} = require('../schemas/order.schema');

const router = express.Router();
const service = new OrderService();

router.post('/',
validationHandler(createOrderSchema, 'body'),
async (req, res, next) => {
    try {
        const body = req.body;
        const newOrder = await service.create(body);
        res.status(201).json(newOrder);
    } catch(error) {
        next(error);
    }
}
);

router.get('/:id',
    validationHandler(getOrderSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const order = await service.findOne(id);
            res.status(200).json(order);
        } catch(error) {
            next(error);
        }
    }
);

router.post('/add-item',
validationHandler(addItemSchema, 'body'),
async (req, res, next) => {
    try {
        const body = req.body;
        const newItem = await service.addItem(body);
        res.status(201).json(newItem);
    } catch(error) {
        next(error);
    }
}
);

module.exports = router;
