const express = require('express');
const mongoose = require('mongoose');
const db = require('./db');
const MenuItem = require('./models/menuItem');
const app = express();
const logRequest = require('./MiddleWare');
const localAuthMiddleware = require('./auth');
require('dotenv').config();

const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');


// using middleware for every endpoint
app.use(logRequest);

// these are also body parsing middlewares
app.use(bodyParser.json());
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


// applying authentication middleware to protect the route
app.get('/', (req, res) => {
  try {
    const htmlContent = `
    <html>
        <head>  
            <title>Welcome Page</title>
        </head>
        <body>
            <h1>Welcome to the Express Server!</h1>
            <p>This is a simple Express server serving an HTML page.</p>
        </body>
    </html>
  `;
    res.send(htmlContent);
  }
  catch (error) {
    res.status(500).json({ error: 'Failed to load page' });
  }
});



// applying authentication middleware to protect the route
const personRoutes = require('./routes/person');
app.use('/person', personRoutes);

const menuRoutes = require('./routes/menu');
const { jwtAuthMiddleware } = require('./jwt');
app.use('/menu',jwtAuthMiddleware, menuRoutes);