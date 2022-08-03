const { Model, DataTypes, Sequelize } = require('sequelize');

const PRODUCT_TABLE = 'product';

const ProductSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    }
}

class Product extends Model {
    static associate() {}

    static config(sequelize) {
        return {
            sequelize,
            tableName: PRODUCT_TABLE,
            modelName: 'Product',
            timestamps: false,
        }
    }
}

module.exports = {
    PRODUCT_TABLE,
    ProductSchema,
    Product,
}
