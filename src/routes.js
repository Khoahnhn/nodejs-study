'use strict';

const express = require('express');
const router = express();

const users = require('./controllers/users/router');
router.use('/users', users);

const provinces = require('./controllers/provinces/router');
router.use('/provinces', provinces);

module.exports = router;
