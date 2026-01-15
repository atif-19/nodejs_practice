const express = require('express');
const mongoose = require('mongoose');
const db = require('./db');
const MenuItem = require('./models/menuItem');
const Person = require('./models/person');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



app.get('/', (req, res) => {
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
});



const personRoutes = require('./routes/person');
app.use('/person', personRoutes);

const menuRoutes = require('./routes/menu');
app.use('/menu', menuRoutes);