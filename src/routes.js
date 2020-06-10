'use strict';

const express = require('express');
const routes = express.Router();

const FirebirdController = require('./controllers/FirebirdController');

routes.post('/query', FirebirdController.query);

module.exports = routes;