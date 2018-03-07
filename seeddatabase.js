const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

var getData = fs.readFileAsync('./seeddata.js', 'utf8');

const mysql = require('mysql');
var db = mysql.createConnection({
  url: 'localhost',
  user: 'root',
  password: ''
})

db.connect((err) => {
  if (err) {
    console.log('Error connecting to db');
  } else {
    console.log('Connected to db!');
  }
});

const strFields = [
  'id',
  'name',
  'cuisine',
  'price',
  'vegetarian',
  'byob',
  'neighborhood',
  'address',
  'city',
  'state',
  'postal_code'
];

const numFields = [
  'latitude',
  'longitude',
  'stars',
  'review_count',
  'is_open',
  'iterator'
];

var createQuery = function(row) {
  let entry = [];
  if (row.neighborhood === 'Leslieville') { console.log('HERERERERE', row) }
  for (let i = 0; i < strFields.length; ++i) {
    let str = row[strFields[i]];
    for (let k = 0; k < str.length; ++k) {
      if (str[k] === '\'' && str[k] !== '\'') {
        console.log('HERE\nHERE\nHERE\nHERE\nHERE\nHERE', row);
        str = str.slice(0, k) + '\'' + str.slice(k + 1);
      }
    }
    entry.push('\'' + str + '\'');
  }
  for (let i = 0; i < numFields.length; ++i) {
    entry.push(row[numFields[i]]);
  }
  return '(' + entry.join(',') + ')';
};

db.query = Promise.promisify(db.query);

getData.then(data => {
  db.query('drop database if exists open_source_table')
    .then(() => db.query('create database open_source_table'))
    .then(() => db.query('use open_source_table'))
    .then(() => db.query('drop table if exists restaurants'))
    .then(() => db.query(`create table restaurants (
      id varchar(22) NOT NULL,
      name varchar(255) DEFAULT NULL,
      cuisine varchar(20) DEFAULT NULL,
      price varchar(4) DEFAULT NULL,
      vegetarian tinyint(1) DEFAULT NULL,
      byob tinyint(1) DEFAULT NULL,
      neighborhood varchar(255) DEFAULT NULL,
      address varchar(255) DEFAULT NULL,
      city varchar(255) DEFAULT NULL,
      state varchar(255) DEFAULT NULL,
      postal_code varchar(255) DEFAULT NULL,
      latitude float DEFAULT NULL,
      longitude float DEFAULT NULL,
      stars float DEFAULT NULL,
      review_count int(11) DEFAULT NULL,
      is_open tinyint(1) DEFAULT NULL,
      iterator int(11) NOT NULL PRIMARY KEY
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`))
    .then(() => {
      const parsedData = JSON.parse(data);
      return Promise.map(parsedData, function(row) {
          return new Promise((res, rej) => {
            res(createQuery(row));
          });
        });
    })
    .then((queryStrings) => {
      return Promise.map(queryStrings, function(entry) {
          return db.query('insert into restaurants values ' + entry);
      })
    })
    .then(() => {
      console.log('Finished seeding database!');
      db.end();
    })
    .catch(error => console.log('Error seeding database', error));
});
  

