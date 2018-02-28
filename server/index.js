const express = require('express');
const parser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const db = require('../database/index.js')
let app = express();

app.use(morgan('dev'));

app.use(parser.json());

app.use(express.static(path.join(__dirname, '../public')));

app.use('/restaurants', function(req, res) {
  console.log('req.query', req.query);
  console.log('req.body', req.body);
  db.query(`select * from open_source_table_about 
    where city = 'Toronto' and neighborhood = 'Downtown Core' limit 4`, function(err, data) {
    if (err) throw err;
    console.log('data:', data);
  });
});

app.get('/images/:id', function(req, res) {
  console.log('here');
  res.set('Content-Type', 'image/jpeg').sendFile(path.join(__dirname, `../public/images/${req.params.id}`), function(err, data) {
    if (err) {
      console.log('Error sending file');
    } else {
      console.log('Sent', req.params.id, data);
    }
  });
});

let port = 3004;

app.listen(port, function() {
  console.log(`Listening on port ${port}!`);
});
