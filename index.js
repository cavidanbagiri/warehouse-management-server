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
    origin: ['http://localhost:5173', 'http://localhost:4173'],
  }
));


// Import Routers
const { UserRouter, AdminRouter, CommonRouter, WarehouseRouter, StockRouter, AreaRouter } = require('./src/routes');

// Import Error Handler
const error_handler = require('./src/middleware/error_handler');

app.use('/api/user', UserRouter);
app.use('/api/admin', AdminRouter);
app.use('/api/warehouse', WarehouseRouter); // Checked
app.use('/api/stock', StockRouter);
app.use('/api/area', AreaRouter);
app.use('/api', CommonRouter);


app.use(error_handler);

const startApp = async () => {

  try{

    try {
      await sequelize.authenticate();
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