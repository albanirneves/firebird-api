'use strict';

const cors = require('cors');
const config = require('../config.json');

const { 
    allowServerToServerAccess = false,
    whitelist = []
} = config.cors;

const corsOptions = {
    origin: function (origin, callback) {
        const allowed = whitelist.some(whiteorigin => {
            return (whiteorigin == '*') || (origin || '').match(new RegExp(whiteorigin));
        });

        if(allowed || (!origin && allowServerToServerAccess)) {
            callback(null, true);
        } else {
            callback('This request is not allowed from this origin');
        }
    }
}

module.exports = cors(corsOptions);