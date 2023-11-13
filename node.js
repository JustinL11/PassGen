
//ZAKARIA FAARAH SERVER 
//PASSGEN SERVER

const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');


const app = express();
const port = 3001; // You can change this port as needed

// Connect to MySQL database
const connection = mysql.createConnection({
	host: "D98FSV3",
	user: "PassGen",
	password: "Tuesday12345",
	database: "PassGen"
  });

  const pool = mysql.createPool(connection);
  
  // Check if the database connection is successful
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database: ' + err);
        throw err; // You may want to handle this error more gracefully in a production environment
    }

    console.log('Connected to the database');
    connection.release(); // Release the connection
});



// Define a route to fetch data from the database
app.get('/getData', (req, res) => {
    // Use the pool to get a connection
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting database connection: ' + err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        // Perform the SQL query
        connection.query('SELECT * FROM UserCredentials', (error, results) => {
            // Release the connection when done
            connection.release();

            if (error) {
                console.error('Error executing query: ' + error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            // Return the data as JSON
            res.json(results);
        });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});