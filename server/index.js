const express = require('express');
const parser = require('body-parser');
const morgan = require('morgan')
const path = require('path');
let app = express();

app.use(morgan('dev'));

app.use(parser.json());

app.use(express.static(path.join(__dirname, '../public')));

let port = 3004;

app.listen(port, function() {
  console.log(`Listening on port ${port}!`);
});
