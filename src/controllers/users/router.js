'use strict'

const express = require('express')
const route = express();
const api = require('./api');

route.get('/', api.getUser);
route.get('/cached-users', api.getUserUsingRedis);

module.exports = route
