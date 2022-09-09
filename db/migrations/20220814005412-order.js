'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const { CUSTOMER_TABLE } = require('../models/customer.model');
const { ORDER_TABLE } = require('../models/order.model');

module.exports = {
    async up (queryInterface) {
      await queryInterface.createTable(ORDER_TABLE, {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        customerId: {
            allowNull: false,
            type: DataTypes.INTEGER,
            unique: true,
            field: 'customer_id',
            references: {
                model: CUSTOMER_TABLE,
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
            field: 'created_at',
            defaultValue: Sequelize.NOW,
        },
      });
    },

    async down (queryInterface) {
      await queryInterface.dropTable(ORDER_TABLE);
    }
  };
