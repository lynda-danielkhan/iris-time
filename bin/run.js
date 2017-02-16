'use strict';
const config = require('../config');
const log = config.log();
const request = require('superagent');
const service = require('../server/service')(config);
const http = require('http');

const server = http.createServer(service);
server.listen();

server.on('listening', function () {
    log.info(`IRIS-Time is listening on ${server.address().port} in ${service.get('env')} mode.`);

    const announce = () => {
        request.put(`http://127.0.0.1:3000/service/time/${server.address().port}`)
            .set('X-IRIS-SERVICE-TOKEN', config.serviceAccessToken)
            .set('X-IRIS-API-TOKEN', config.irisApiToken)
            .end((err) => {
                if (err) {
                    log.debug(err);
                    log.info('Error connecting to Iris');
                }
            });
    };
    announce();
    setInterval(announce, 15 * 1000);
});