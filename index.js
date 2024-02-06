const express = require('express');
const app = express();

// Import Sequeelize
const { sequelize } = require('./models');

// Import Cors
const cors = require('cors')

// Import Dotenv file
require('dotenv').config()
const PORT = process.env.PORT || 3001

// Import cookieParser for using Frontend sending
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
app.use(cors(
  {
    credentials: true,
    origin: ['http://localhost:5173'],
  }
));


// Import Routers
const { UserRouter, AdminRouter } = require('./src/routes');

// Import Error Handler
const error_handler = require('./src/middleware/error_handler');

app.use('/api/user', UserRouter);
app.use('/api/admin', AdminRouter);


app.use(error_handler);

const startApp = async () => {

  try{

    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }

    app.listen(PORT, ()=>{
      console.log('server listening on : ', PORT);
    });

  }
  catch(err){
    console.log('Internal Server Error : ', err);
  }

}

startApp();