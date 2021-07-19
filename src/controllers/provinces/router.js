'use strict'

const express = require('express')
const route = express();
const api = require('./api');

route.get('/search', api.searchProvinces);
route.get('/', api.showAllDivisions);
route.get('/p', api.listProvinces);
route.get('/p/:code', api.getProvinces);

module.exports = route