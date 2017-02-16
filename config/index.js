require('dotenv').config();
const bunyan = require('bunyan');
const serviceAccessToken = require('crypto').randomBytes(16).toString('hex').slice(0, 32);

const log = {
    development: () => {
        return bunyan.createLogger({ name: 'IRIS-TIME-development', level: 'debug' });
    },
    production: () => {
        return bunyan.createLogger({ name: 'IRIS-TIME-production', level: 'info' });
    },
    test: () => {
        return bunyan.createLogger({ name: 'IRIS-TIME-test', level: 'fatal' });
    }
};

module.exports = {
    googleTimeApiKey: process.env.GOOGLE_TIME_API_KEY,
    googleGeoApiKey: process.env.GOOGLE_GEO_API_KEY,
    irisApiToken: process.env.IRIS_API_TOKEN,
    serviceAccessToken: serviceAccessToken,
    log: (env) => {
        if (env) return log[env]();
        return log[process.env.NODE_ENV || 'development']();
    }
};