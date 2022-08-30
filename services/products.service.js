const boom = require("@hapi/boom");
const { models } = require('../libs/sequilize');
const { Op } = require('sequelize');

class ProductsService {

    constructor() {}

    async create(data) {
        const newProduct = await models.Product.create(data);
        return newProduct;
    }

    async find(query) {
        const options = {
            include: [ "category" ],
            where: {}
        }
        const { limit, offset } = query;
        if( limit && offset ) {
            options.limit = limit;
            options.offset = offset;
        }
        const { price_min, price_max } = query;
        if( price_min && price_max ) {
            options.where.price = {
                [Op.gte]: price_min,
                [Op.lte]: price_max,
            };
        }
        const products = await models.Product.findAll( options );

        return products;
    }

    async findOne(id) {
        const product = await models.Product.findByPk(id);
        if(!product) {
            throw boom.notFound('product not found');
        }
        return product;
    }

    async update(id, changes) {
        const product = await this.findOne(id);
        const newProduct = await product.update(changes);
        return newProduct;
    }

    async delete(id) {
        const product = await this.findOne(id);
        await product.destroy();
        return { id };
    }

}

module.exports = ProductsService;
