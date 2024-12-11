import express from 'express';
import _ from 'lodash';
import fs from 'fs';
import yaml from 'yaml';
import OpenApiValidator from 'express-openapi-validator';
import path from 'path';
import { fileURLToPath } from 'url';
import * as hospitalLib from 'hospital-lib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 7200;

const MIN = 0;
const MAX = 3;

// Use PatientState enum values
const status = Object.values(hospitalLib.PatientState);

// Use Drug enum values and create valid combinations
const treatments = [
  '',
  hospitalLib.Drug.ASPIRIN,
  hospitalLib.Drug.ANTIBIOTIC,
  hospitalLib.Drug.INSULIN,
  hospitalLib.Drug.PARACETAMOL,
  `${hospitalLib.Drug.INSULIN},${hospitalLib.Drug.ANTIBIOTIC}`,
  `${hospitalLib.Drug.PARACETAMOL},${hospitalLib.Drug.ASPIRIN}`
];

// Parse the OpenAPI document
const openApiDocument = yaml.parse(fs.readFileSync(path.join(__dirname, 'openapi.yaml'), 'utf8'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use(
  OpenApiValidator.middleware({
    apiSpec: openApiDocument,
    validateRequests: true,
    validateResponses: true,
  })
);

app.get('/patients', (req, res) =>
  res.json(_.flatMap(status, (status) => Array(_.random(MIN, MAX)).fill(status)).join(','))
);

app.get('/drugs', (req, res) => res.json(treatments[_.random(0, treatments.length - 1)]));

// Error handler
app.use((err, req, res) => {
  // eslint-disable-next-line no-console
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Hospital Backend listening on port ${port}!`));
