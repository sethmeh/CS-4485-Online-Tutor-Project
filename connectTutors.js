const express = require("express");
const path = require("path");
const mysql = require("mysql");
const dotenv = require("dotenv");
const ejs = require("ejs");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join("C:/Users/Owner/Online Tutoring", "views"));


const connection = mysql.createConnection({
    host: 'cs-4485-project.czvucu0ltt8d.us-east-2.rds.amazonaws.com',
    user: 'admin',
    password: 'NotCardGame1',
    database: 'Database_Schema'
});

const port = 3000;


/*
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.stack);
        return;
    }

*/
    console.log('Connected to MySQL as ID', connection.threadId);

    // Query to get the list of tables in the Database_Schema
    const showTablesQuery = 'SHOW TABLES';

    const tableNames = []; // Initialize an array to store table names

    const selectTutorQuery = 'SELECT * FROM Tutor';

    const tutorData = []; // Initialize an array to store 'Tutor' table data

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
            tableNames.push(tableName); // Push the table name into the array
            console.log(`Table: ${tableName}`);

            // Query to fetch all rows from the current table
            const selectAllQuery = `SELECT * FROM ${tableName}`;

            connection.query(selectAllQuery, (err, rows, fields) => {
                if (err) {
                    console.error(`Error fetching rows from ${tableName}:`, err);
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
                    return;
                }

                // Display the rows
                rows.forEach((row) => {
                    console.log(row);
                });

                // Add a separator for better readability
                console.log('--------------------------');

                // Now you can access the array of table names
                console.log('Table Names:', tableNames);

                console.log('--------------------------');

                connection.query(selectTutorQuery, (err, rows, fields) => {
                    if(++tablesProcessed === results.length){
                        // Store the 'Tutor' table data in the tutorData array
                        tutorData.push(...rows);
    
                        // Display the data or perform further processing
                        console.log('Tutor Table Data:', tutorData);


                        ///////////////////////////////

                        rows.forEach(row => {
                            console.log('Row Data:', row);
                        });
                        
                        const columnNames = fields.map(field => field.name);
                        console.log('Column Names:', columnNames);


                        app.get("/", (req, res) => {
                            // Fetch data from 'Tutor' table
                            connection.query(selectTutorQuery, (err, rows, fields) => {
                                if (err) {
                                    console.error('Error fetching data from Tutor table:', err);
                                    res.status(500).send('Error fetching data');
                                    return;
                                }
                        
                                const tutorData = rows; // Store the 'Tutor' table data
                        
                                // Render your HTML page with the 'tutorData' variable
                                res.render("index", { tutorData });
                            });
                        });


                        app.listen(port, () => {
                            console.log(`Server is running on port ${port}`);
                        });
                        

                        //////////////////////////////////

                        ///////////////

                        /*
                        // After executing the query to fetch data from the 'Tutor' table
                        connection.query(selectTutorQuery, (err, rows, fields) => {
                            if (err) {
                                console.error('Error fetching data from Tutor table:', err);
                                res.status(500).send('Error fetching data');
                                return;
                            }
                            
                            const columnNames = fields.map(field => field.name);
                            console.log('Column Names:', columnNames);
                            const tutorData = rows; // Store the 'Tutor' table data
                            // Render your HTML page with the 'tutorData' variable
                            res.render("index", { tutorData, columnNames });
                        });
                        */
                        
                        ///////////////



                        /*
                        connection.end((endErr) => {
                            if (endErr) {
                                console.error('Error closing connection:', endErr.stack);
                            } else {
                                console.log('Connection closed:', connection.state);
                            }
                        });
                        */
                    }
                })

 
            });
        });
    });
//});
