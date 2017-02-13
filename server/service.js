'use strict';

const express = require('express');
const service = express();
const request = require('superagent');
const moment = require('moment');


service.get('/service/:location', (req, res, next) => {

    request.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + req.params.location + '&key=GEO_API_KEY', (err, response) => {
        if(err) {
            console.log(err);
            return res.sendStatus(500);
        }

        const location = response.body.results[0].geometry.location;
        const timestamp = +moment().format('X');

        request.get('https://maps.googleapis.com/maps/api/timezone/json?location=' + location.lat + ',' + location.lng + '&timestamp=' + timestamp + '&key=TIMEZONE_API_KEY', (err, response) => {
            if(err) {
                console.log(err);
                return res.sendStatus(500);
            }
            
            const result = response.body;

            const timeString = moment.unix(timestamp + result.dstOffset + result.rawOffset).utc().format('dddd, MMMM Do YYYY, h:mm:ss a');
        
            res.json({result: timeString});
        });
    });

});

module.exports = service;