// app.js
const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = process.env.PORT || 3000;
const routes = require("./routes/routes")

const options = {
    swaggerDefinition: {
      info: {
        title: 'Christmas Draw API Documentation',
        version: '1.0.0',
      },
    },
    apis: ['./routes/*.js'],
  };
  
const specs = swaggerJsdoc(options);
app.use('/api', routes);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));



// Start the server
app.listen(port, () => {
    console.log("Server started")
});



