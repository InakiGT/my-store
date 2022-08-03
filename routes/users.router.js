const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');
const { createUserSchema } = require('../schemas/user.schema');
const UserService = require('./../services/user.service');

const router = express.Router();
const service = new UserService();

router.get("/", async (req, res, next) => {
    try {
        const users = await service.find();
        res.json(users);
    } catch(err) {
        next(err);
    }
});

router.post("/",
validatorHandler(createUserSchema, 'body'),
async (req, res, next) => {
    try {
        const body = req.body;
        const newUser = await service.create(body);
        res.status(201).json(newUser);
    } catch(err) {
        next(err);
    }
});

module.exports = router;
