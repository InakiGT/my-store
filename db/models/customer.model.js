const { Model, DataTypes, Sequelize } =  require('sequelize');
const { USER_TABLE }= require('./user.model');

const CUSTOMER_TABLE = 'customers';

console.log("HOLA");

const CustomerSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    lastName: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'last_name',
    },
    phone: {
        allowNull: true,
        type: DataTypes.STRING
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
    },
    userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'user_id',
        references: {
            model: USER_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
}

class Customer extends Model {
    static associate(models) {
        this.belongsTo(models.User, { as: 'user' });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: CUSTOMER_TABLE,
            modelName: 'Customer',
            timestamps: false,
        }
    }
}

module.exports = { Customer, CUSTOMER_TABLE, CustomerSchema }
