const express = require('express');
const parser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const db = require('../database/index.js')
const Promise = require('bluebird');
const table = 'restaurants';
let app = express();

app.use(morgan('dev'));

app.use(parser.json());

app.use(express.static(path.join(__dirname, '../public')));

db.query = Promise.promisify(db.query);

app.use('/restaurants/:field', function(req, res) {
  db.query(`select ${req.params.field} from ${table} 
      group by ${req.params.field} order by 
      ${req.params.field} asc`)
    .then(result => res.send(result))
    .catch(err => res.send(err));
});

app.use('/restaurants', function(req, res) {
  if (req.body.initial) {
    var query = `select iterator, name, cuisine,
      neighborhood, price, vegetarian, stars,
      byob from ${table} order by stars desc limit 5`;
  } else {
    var searchParams = req.body;
    var query = [`select iterator, name, cuisine, 
      neighborhood, price, vegetarian, stars, 
      byob from ${table}`];
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
    if (addParams.length || prices.length) {
      query.push(' where ');
    }
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
    //query.push(' limit 10');
    query = query.join('');
    console.log('query:', query);
  }
  db.query(query)
    .then(result => res.send(result))
    .catch(err => res.send(err));
});

let port = 3004;

app.listen(port, function() {
  console.log(`Listening on port ${port}!`);
});
