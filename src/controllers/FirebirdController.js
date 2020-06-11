'use strict';

const connection = require('../database/connection');

module.exports = {
    async query(request, response) {
        try {
            const { sql } = request.body;

            const db = await connection();
            const results = await db.queryAsync(sql);

            db.detach();
            
            response.header('X-Total-Count', results.length);
            
            return response.json(results);
            
        } catch(error) {
            return response.json({ error: error.toString() });
        }
    }
}