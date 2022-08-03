const boom = require("@hapi/boom");
const { models } = require('../libs/sequilize');

class ProductsService {

    constructor() {}

    create(data) {
        return data;
    }

    async find() {
        const rta = await models.Product.findAll();
        return rta;
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
        const rta = await product.update(changes);
        return rta;
    }

    async delete(id) {
        const product = await this.findOne(id);
        await product.destroy();
        return { id };
    }

}

module.exports = ProductsService;
