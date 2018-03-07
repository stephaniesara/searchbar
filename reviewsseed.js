const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const tables = require('./reviewTables');
const mysql = require('mysql');

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

db.query('drop database if exists open_source_table_reviews');

var seedTable = function(table) {

  var getData = fs.readFileAsync(table.dataFile, 'utf8');

  var createQuery = function(row) {
    let entry = [];
    for (let i = 0; i < table.fields.length; ++i) {
      let str = table.fields.length;
      if (typeof str === 'string') {
        str = str.replace(/[']/, () => "''" ); // Replace single quote with two single quotes
        entry.push('\'' + str + '\'');
      } else {
        entry.push(str);
      }
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
        db.end();
      })
      .catch(error => console.log('Error seeding database', error));
  });
    
};

tables.forEach(seedTable);