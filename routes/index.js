const express = require('express');
const productsRouter = require('./products.router');
const usersRouter = require('./users.router');

function routersApi( app ) {
    const router = express.Router();

    app.use("/api/v1", router); // Ruta maestra
    router.use('/products', productsRouter);
    router.use('/user', usersRouter);
    router.use('/categories', usersRouter);
}

module.exports = routersApi;
