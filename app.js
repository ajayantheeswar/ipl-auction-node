const express = require('express');
const bodyParser = require('body-parser'); 

const cors = require('cors');
const sequelize = require('./Database/Database');

// Routers Imports
const AdminRoute = require('./Routes/Admin');
const UserRoute = require('./Routes/User');

const app = express()

// DataBase imports
const AdminUser = require('./Models/AdminUser');
const Auction = require('./Models/Auction');
const User = require('./Models/User');
const Bid = require('./Models/Bid');

  // --- Database Relations ---
AdminUser.hasMany(Auction);
Auction.belongsTo(AdminUser);
User.hasMany(Auction);
User.hasMany(Bid);
Auction.hasMany(Bid);

// Express app 
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/admin',AdminRoute.router);
app.use('/user',UserRoute.router)

const RefreshDatabase = false;

sequelize.sync({force : RefreshDatabase})
  .then(res=>{
    const timer = setInterval(async () => {
      try {
          let data = await sequelize.query('SELECT stopbid();');
          console.log('Executed !');
        } catch (error) {
          console.error(error.message);
        }
    },1000 * 5); 

    app.listen(3002);

});
