/* eslint-disable @typescript-eslint/no-var-requires */

/*
 * Basic static file server
 *
 * Flags:
 *
 * --port <port_to_serve_on>
 * --dir <directory_to_serve>
 */

const portIndex = process.argv.indexOf('--port');
const port = process.argv[portIndex + 1] || '8080';

const dirIndex = process.argv.indexOf('--dir');
const directory = process.argv[dirIndex + 1];

if (!directory) throw new Error('Must provide a valid directory!');

const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(directory)));

app.listen(port, () => {
  console.log(`✅ Product builder running on: http://localhost:${port}`);
});
