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

let makeDatabase = function() {
  return db.query(`drop database if exists ${databaseName}`)
    .then(() => db.query(`create database ${databaseName}`))
    .then(() => db.query(`use ${databaseName}`))
    .catch(error => console.log('Error making database', error));
};

db.connect = Promise.promisify(db.connect);
db.query = Promise.promisify(db.query);

let seedTable = function(table) {

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


    getData.then(data => {
      console.log('got data');
      db.query(() => {
        console.log('dropping');
        console.log(table.name);
        return db.query(`drop table if exists ${table.name}`);
      })
        .then(() => {
          console.log('creating');
          console.log(table.name);
          console.log(table.schema);
          return db.query(`create table ${table.name} ${table.schema}`);
        })
        .catch(error => console.log('Mysql error', error)) 
        .then(() => {
          console.log('here');
          const parsedData = JSON.parse(data);
          console.log(parsedData.length);
          return Promise.map(parsedData, function(row, i) {
              console.log('querying for row #' + i);
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

db.connect()
  .then(() => {
    console.log('Connected to db!');
    return makeDatabase();
  })
  .then(() => {console.log('starting'); return Promise.map(tables, seedTable);})
  .then(() => {
    console.log('Finished making database');
    db.end();
  });

