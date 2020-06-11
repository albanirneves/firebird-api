'use strict';

const express = require('express');
const app = express();
const cors = require('./modules/cors');
const jwt = require('./modules/jwt');

const FirebirdController = require('./controllers/FirebirdController');

app.use(cors);
app.use(jwt);
app.use(express.json());

app.post('/query', FirebirdController.query);

app.listen(process.env.PORT || 3000);