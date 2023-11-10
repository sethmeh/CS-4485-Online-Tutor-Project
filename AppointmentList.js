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
    
    console.log('Connected to the database as id ' + connection.threadId);

    // Changing the type between 'student' and 'tutor' will determine which type of user the appointments are being displayed to
    let userType = 'student';

    // Query to fetch appointments for both students and tutors
    const selectQuery = `
        SELECT 
            Tutor.Name AS tutor_name,
            Users.Name AS student_name,
            Appointment_List.Date,
            Appointment_List.Start_Time,
            Appointment_List.End_Time
        FROM
            Appointment_List
        JOIN
            Tutor ON Appointment_List.T_Username = Tutor.Username
        JOIN
            Users ON Appointment_List.U_Username = Users.Username
    `;

    connection.query(selectQuery, (err, rows, fields) => {
        if (err) {
            console.error('Error fetching data: ', err);
            connection.end(); // Close connection in case of error
            return;
        }

        if (userType === 'student') {
            console.log('Appointments for students:', rows); // Displays appointments for students
        } else if (userType === 'tutor') {
            console.log('Appointments for tutors:', rows); // Displays appointments for tutors
        }

        // Close connection after processing appointments
        connection.end((endErr) => {
            if (endErr) {
                console.error('Error closing connection:', endErr.stack);
            } else {
                console.log('Connection closed:', connection.state);
            }
        });
    });
});