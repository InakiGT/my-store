const { config } = require('../config/config');


module.exports = {
    development: {
        url: config.dbUrl,
        dialect: 'mysql'
    },
    production: {
        url: config.dbUrl,
        dialect: 'mysql',
        ssl: {
            rejectUnauthorized: false,
        },
    },
}
