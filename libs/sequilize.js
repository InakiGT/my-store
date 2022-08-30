const { Sequelize } = require('sequelize');

const { config } = require('../config/config');
const setupModels = require('../db/models');

const options = {
    dialect: 'mysql',
    logging: config.isProd ? false : () => {},
}

if( config.isProd ) {
    options.ssl = {
        rejectUnauthorized: false,
    }
}

const sequelize = new Sequelize( config.dbUrl, options );

setupModels(sequelize);

module.exports = sequelize;
