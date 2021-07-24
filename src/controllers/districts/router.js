'use strict'

const express = require('express')
const route = express();
const api = require('./api');

route.get('/d', api.listDistricts);
route.get('/d/:code', api.getDistrict);

module.exports = route;