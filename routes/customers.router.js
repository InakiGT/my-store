const express = require('express');
const CustomerService = require('../services/customers.service');
const validationHandler = require('../middlewares/validator.handler');

const {
    createCustomerSchema,
    getCustomerSchema,
    updateCustomerSchema,
} = require('../schemas/user.schema');

const router = express.Router();
const service = new CustomerService();

router.get('/', async (req, res, next) => {
    try {
        res.json(await service.find);
    } catch(err) {
        next(err);
    }
});

router.post('/',
    validationHandler(createCustomerSchema, 'body'),
    async(req, res, next) => {
        try {
            const body = req.body;
            res.status(201).json(await service.create(body));
        } catch(err) {
            next(err);
        }
});

router.patch('/:id',
    validationHandler(getCustomerSchema, 'params'),
    validationHandler(updateCustomerSchema, 'body'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;
            res.status(201).json(await service.update(id, body));
        } catch(err) {
            next(err);
        }
    }
);

router.delete('/:id',
    validationHandler(getCustomerSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            res.status(200).json(await service.delete(id));
        } catch(err) {
            next(err);
        }
    }
);

module.exports = router;
