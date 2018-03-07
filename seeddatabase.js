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

const fields = [
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
  'postal_code',
  'latitude',
  'longitude',
  'stars',
  'review_count',
  'is_open',
  'iterator'
];

var createQuery = function(row) {
  console.log('row', row);
  let entry = [];
  for (let i = 0; i < fields.length; ++i) {
    entry = entry.concat('\'', row[fields[i]], '\'');
  }
  return '(' + entry.join(',') + ')';
};

console.log(db);
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
          return db.query(`insert into restaurants values ${createQuery(row)}`);
        });
    })
    .then(() => {
      console.log('Finished seeding database!');
      db.end();
    });
})
  

