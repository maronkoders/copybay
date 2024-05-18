const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const PDFDocument = require('pdfkit');
const fs = require('fs');

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
  res.send('Hello welcome to Infynite Solutions CV maker!');
});

app.post('/generate-cv', (req, res) => {
  const data = req.body;

  const doc = new PDFDocument();
  const fileName = `cv_${Date.now()}.pdf`;
  const filePath = `./public/${fileName}`;

  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(25).text('Curriculum Vitae', { align: 'center' });

  doc.moveDown();
  doc.fontSize(18).text(`Name: ${data.name}`);
  doc.text(`Email: ${data.email}`);
  doc.text(`Phone: ${data.phone}`);

  doc.moveDown();
  doc.fontSize(18).text('Education');
  doc.fontSize(14).text(data.education);

  doc.moveDown();
  doc.fontSize(18).text('Experience');
  doc.fontSize(14).text(data.experience);

  doc.moveDown();
  doc.fontSize(18).text('Skills');
  doc.fontSize(14).text(data.skills);

  doc.end();

  res.redirect(`/public/${fileName}`);
});


app.listen(PORT, () => {
  console.log(`Server listening on port.` + appUrl);
});