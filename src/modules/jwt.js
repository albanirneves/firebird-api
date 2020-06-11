'use strict';

const jwt = require('jsonwebtoken');
const { secret } = require('../config.json');

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.status(401).send({ error: 'Token required' });
    }

    const parts = authHeader.split(' ');

    if(parts.length !== 2) {
        return res.status(401).send({ error: 'Token malformatted' });
    }

    const [ scheme, token ] = parts;

    if(!/^Bearer$/i.test(scheme)) {
        return res.status(401).send({ error: 'Token malformatted' });
    }

    jwt.verify(token, secret, (err, decoded) => {
        if(err) {
            return res.status(401).send({ error: 'Invalid token' });
        } else {
            decoded.user = 'FirebirdRestAPI';
            return next();
        }
    });
}