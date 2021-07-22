'use strict';

const express = require('express');
const router = express();

const users = require('./controllers/users/router');
router.use('/users', users);

const provinces = require('./controllers/provinces/router');
router.use('/provinces', provinces);

const districts = require('./controllers/districts/router');
router.use('/districts', districts);

const wards = require('./controllers/wards/router');
router.use('/wards', wards);

module.exports = router;
