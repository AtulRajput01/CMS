const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

// Use cors middleware to allow requests from the frontend
app.use(cors());


app.use(bodyParser.json());

// Define a port number for the server to listen on
const port = 3000;

const connection = require('./db');

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the database');
    }
});

app.post('/create-entity', (req, res) => {
    const { entityName, attributes } = req.body;

    // Construct the CREATE TABLE SQL query based on attributes
    let createTableQuery = `CREATE TABLE ${entityName} (id INT AUTO_INCREMENT PRIMARY KEY`;
    attributes.forEach(attr => {
        createTableQuery += `, ${attr.name} ${attr.type.toUpperCase()}`;
    });
    createTableQuery += ');';

    // Execute the query
    connection.query(createTableQuery, (err, results) => {
        if (err) {
            console.error('Error creating entity:', err);
            res.status(500).send('Error creating entity');
        } else {
            console.log('Entity created successfully');
            res.send('Entity created successfully');
        }
    });
});

app.post('/entity/:entityName', (req, res) => {
    const { entityName } = req.params;
    const data = req.body;

    // Build INSERT INTO query
    const columns = Object.keys(data).join(', ');
    const values = Object.values(data).map(value => `'${value}'`).join(', ');

    const insertQuery = `INSERT INTO ${entityName} (${columns}) VALUES (${values})`;

    connection.query(insertQuery, (err, results) => {
        if (err) {
            console.error('Error creating entry:', err);
            res.status(500).send('Error creating entry');
        } else {
            res.send(`Entry created successfully with ID: ${results.insertId}`);
        }
    });
});

app.get('/entity/:entityName', (req, res) => {
    const { entityName } = req.params;

    // Fetch all entries
    const selectQuery = `SELECT * FROM ${entityName}`;
    connection.query(selectQuery, (err, results) => {
        if (err) {
            console.error('Error fetching entries:', err);
            res.status(500).send('Error fetching entries');
        } else {
            res.json(results);
        }
    });
});

// Fetch a specific entry by ID
app.get('/entity/:entityName/:id', (req, res) => {
    const { entityName, id } = req.params;

    const selectQuery = `SELECT * FROM ${entityName} WHERE id = ${id}`;
    connection.query(selectQuery, (err, results) => {
        if (err) {
            console.error('Error fetching entry:', err);
            res.status(500).send('Error fetching entry');
        } else {
            if (results.length === 0) {
                res.status(404).send('Entry not found');
            } else {
                res.json(results[0]);
            }
        }
    });
});

app.put('/entity/:entityName/:id', (req, res) => {
    const { entityName, id } = req.params;
    const data = req.body;

    // Build UPDATE query
    const setClauses = Object.keys(data)
        .map(key => `${key} = '${data[key]}'`)
        .join(', ');

    const updateQuery = `UPDATE ${entityName} SET ${setClauses} WHERE id = ${id}`;

    connection.query(updateQuery, (err, results) => {
        if (err) {
            console.error('Error updating entry:', err);
            res.status(500).send('Error updating entry');
        } else {
            res.send(`Entry with ID ${id} updated successfully`);
        }
    });
});
app.delete('/entity/:entityName/:id', (req, res) => {
    const { entityName, id } = req.params;

    const deleteQuery = `DELETE FROM ${entityName} WHERE id = ${id}`;

    connection.query(deleteQuery, (err, results) => {
        if (err) {
            console.error('Error deleting entry:', err);
            res.status(500).send('Error deleting entry');
        } else {
            res.send(`Entry with ID ${id} deleted successfully`);
        }
    });
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
