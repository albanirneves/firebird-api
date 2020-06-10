'use strict';

const connection = require('../database/connection');

module.exports = {
    async query(request, response) {
        try {
            const token = request.headers.authorization;
            const { sql } = request.body;

            const user = token.split(' ')[0];
            const password = token.split(' ')[1];
            const db = await connection({ user, password });
    
            return response.json(await db.queryAsync(sql));
            
        } catch(error) {
            return response.json({ error: error.toString() });
        }
    }
}