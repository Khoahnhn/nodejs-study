'use strict'

const express = require('express')
const route = express();
const api = require('./api');

route.get('/w', api.listWards);
route.get('/w/:code', api.getWard);

module.exports = route;