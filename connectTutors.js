const express = require("express");
const path = require("path");
const mysql = require("mysql");
const dotenv = require("dotenv");

const connection = mysql.createConnection({
    host: 'cs-4485-project.czvucu0ltt8d.us-east-2.rds.amazonaws.com',
    user: 'admin',
    password: 'NotCardGame1',
    database: 'Database_Schema'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.stack);
        return;
    }

    console.log('Connected to MySQL as ID', connection.threadId);

    // Query to get the list of tables in the Database_Schema
    const showTablesQuery = 'SHOW TABLES';

    connection.query(showTablesQuery, (err, results, fields) => {
        if (err) {
            console.error('Error fetching tables:', err);
            connection.end(); // Close the connection in case of an error
            return;
        }

        // Use a counter to keep track of the number of tables processed
        let tablesProcessed = 0;

        // Loop through the tables and fetch all rows from each table
        results.forEach((table) => {
            const tableName = table[`Tables_in_${connection.config.database}`];
            console.log(`Table: ${tableName}`);

            // Query to fetch all rows from the current table
            const selectAllQuery = `SELECT * FROM ${tableName}`;

            connection.query(selectAllQuery, (err, rows, fields) => {
                if (err) {
                    console.error(`Error fetching rows from ${tableName}:`, err);
                    // Close the connection after processing all tables
                    if (++tablesProcessed === results.length) {
                        connection.end();
                    }
                    return;
                }

                // Display the rows
                rows.forEach((row) => {
                    console.log(row);
                });

                // Add a separator for better readability
                console.log('--------------------------');

                // Close the connection after processing all tables
                if (++tablesProcessed === results.length) {
                    connection.end((endErr) => {
                        if (endErr) {
                            console.error('Error closing connection:', endErr.stack);
                        } else {
                            console.log('Connection closed:', connection.state);
                        }
                    });
                }
            });
        });
    });
});
