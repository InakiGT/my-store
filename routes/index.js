const express = require('express');
const productsRouter = require('./products.router');
const usersRouter = require('./users.router');
const categoriesRouter = require('./categories.router');
const customerRouter = require('./customers.router');

function routersApi( app ) {
    const router = express.Router();

    app.use("/api/v1", router); // Ruta maestra
    router.use('/products', productsRouter);
    router.use('/users', usersRouter);
    router.use('/categories', usersRouter);
    router.use('/customers', customerRouter);
}

module.exports = routersApi;
