'use strict'; 

const Firebird = require('node-firebird');

const config = require('../config.json');

const { database, host, port } = config.connection;
const role = null;
const pageSize = 4096;
const timeout = 3000;

async function connection() {
    return new Promise((resolve, reject) => {
        try {
            const user     = process.env.FIREBIRDAPI_USER;
            const password = process.env.FIREBIRDAPI_PASSWORD;

            if(!user || !password) {
                throw new Error('user and password required');
            }

            Firebird.attach({
                user,
                password,
                database,
                host,
                port,
                role,
                pageSize,
                timeout
            }, function (error, db) {
                if (error) {
                    reject(error);
                } else {
                    db.queryAsync = buildQueryAsync(db);
                    resolve(db);
                }
            });
        } catch(error) {
            reject(error);
        }
    });
};

function buildQueryAsync(db) {
    return async function (sql) {
        return new Promise((resolve, reject) => {
            try {
                db.query(sql, (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        if(results) {
                            results.map(record => {
                                Object.keys(record).map(campo => {
                                    if(record[campo] && record[campo].buffer) {
                                        record[campo] = record[campo].toString();
                                    }
                                });
                            });
                        }
    
                        resolve(results);
                    }
                });
            } catch(error) {
                reject(error);
            }
        });
    };
};

module.exports = connection;