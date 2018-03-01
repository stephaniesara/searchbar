const express = require('express');
const parser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const db = require('../database/index.js')
const Promise = require('bluebird');
let app = express();

app.use(morgan('dev'));

app.use(parser.json());

app.use(express.static(path.join(__dirname, '../public')));

db.query = Promise.promisify(db.query);

app.use('/restaurants', function(req, res) {
  //const fields = ['name', 'cuisine', 'neighborhood', 'price', 'vegetarian', 'byob'];
  var searchParams = req.body;
  var query = [`select iterator, name, cuisine, 
    neighborhood, price, vegetarian, 
    byob from open_source_table_about`];
  var addParams = [];
  var prices = [];
  for (field in searchParams) {
    if (searchParams[field]) {
      if (field[0] === '$'){
        prices.push(`price = '${field}'`);
      } else {
        addParams.push(`${field} = ${searchParams[field] === true ? 1 : '\'' + searchParams[field] + '\''}`);
      }
    }
  }
  query.push(' where ');
  if (addParams.length) {
    query.push(addParams.join(' and '));
  }
  if (prices.length) {
    if (addParams.length) {
      query.push(' and ')
    }
    query.push('(');
    query.push(prices.join(' or '));
    query.push(')');
  }
  query.push(' limit 10');
  query = query.join('');
  console.log('query:', query);
  db.query(query)
    .then(result => res.send(result))
    .catch(err => console.log('Error querying database'));
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
