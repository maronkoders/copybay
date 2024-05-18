const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

const appUrl =  `http://localhost:${PORT}`;

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Copybay API',
      version: '1.0.0',
      description: 'REST API for Copybay',
    },
    servers: [
      {
        url: appUrl,
      },
    ],
  },
  apis: ['./index.js'], // files containing annotations as above
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  /**
    * @openapi
    * /:
    *   get:
    *     description: Initial page to the API
    *     responses:
    *       200:
    *         description: Returns a mysterious string.
    */

app.get('/', (req, res) => {
  res.send('Hello from MERN stack!');
});

app.listen(PORT, () => {
  console.log(`Server listening on port.` + appUrl);
});