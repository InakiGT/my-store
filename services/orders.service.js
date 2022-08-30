const { models } = require('./../libs/sequilize');

class OrderService {
    constructor() {}

    async create(data) {
        const newOrder = await models.Order.create(data);
        return newOrder;
    }

    async addItem(data) {
        const newItem = await models.OrderProduct.create(data);
        return newItem;
    }

    async find() {}

    async findOne(id) {
        const order = await models.Order.findByPk(id, {
            include: [{
                association: 'customer',
                include: [ 'user' ],
            },
            'items'
        ],
        });
        return order;
    }

    update(id) {
        const order = this.findOne(id);
        return order;
    }

    delete(id) {
        const order = this.findOne(id);
        return order;
    }
}

module.exports = OrderService;
