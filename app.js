const express = require('express');
const bodyParser = require('body-parser'); 

const cors = require('cors');


const sequelize = require('./Database/Database');

// Routers Imports
const Admin = require('./Routes/Admin');

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/admin',Admin.router);

const RefreshDatabase = true

sequelize.sync({force : RefreshDatabase})
  .then(res=>{
    app.listen(3002);
});
