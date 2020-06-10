'use strict'; 

const nodeFirebird = require('node-firebird');
const { database, host, port, role, pageSize, timeout } = require('../../config.json');

async function connection({ user, password }) {
    return new Promise((resolve, reject) => {
        try {
            if(!user || !password) {
                throw new Error('user and password required');
            }

            nodeFirebird.attach({
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