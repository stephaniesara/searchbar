const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const tables = require('./reviewTables');
const mysql = require('mysql');
const databaseName = 'open_source_table_reviews';

var db = mysql.createConnection({
  url: 'localhost',
  user: 'root',
  password: ''
});

db.connect((err) => {
  if (err) {
    console.log('Error connecting to db');
  } else {
    console.log('Connected to db!');
  }
});

db.query(`drop database if exists ${databaseName}`);

var seedTable = function(table) {

  return new Promise((res, rej) => {

    var getData = fs.readFileAsync(table.dataFile, 'utf8');

    var createQuery = function(row) {
      let entry = [];
      for (let i = 0; i < table.fields.length; ++i) {
        let str = row[table.fields[i]];
        if (table.fields[i] === 'date' || table.fields[i] === 'yelping_since') {
          str = str.replace(/[T|Z]/g, char => char === 'T' ? ' ' : '' );
        }
        if (typeof str === 'string') {
          str = str.replace(/['|\\]/g, char => char === "'" ? "''" : '\\\\');
          str = '\'' + str + '\'';
        }
        entry.push(str);
      }
      return '(' + entry.join(',') + ')';
    };

    db.query = Promise.promisify(db.query);

    getData.then(data => {
      db.query('create database if not exists open_source_table_reviews')
        .then(() => db.query('use open_source_table_reviews'))
        .then(() => db.query(`drop table if exists ${table.name}`))
        .then(() => db.query(`create table ${table.name} ${table.schema}`))
        .then(() => {
          const parsedData = JSON.parse(data);
          return Promise.map(parsedData, function(row) {
              return db.query(`insert into ${table.name} values ${createQuery(row)}`);
            });
        })
        .then(() => {
          console.log(`Finished seeding table: ${table.name}`);
          res();
        })
        .catch(error => {
          console.log(`Error seeding table ${table.name}`, error);
          rej(error);
        });
    });

  });
    
};

Promise.map(tables, seedTable).then(() => db.end());