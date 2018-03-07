const mysql = require('mysql');
const fs = require('fs');
const Promise = require('bluebird');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: ''
});

db.connect(() => console.log('Connected!'));

db.query = Promise.promisify(db.query);

db.query('use open_source_table')
  .then( () => db.query('insert into restaurants values (\'tTzQZTrwBgwxMch77nCJfQ\',\'Hibiscus\',\'Japanese\',\'$\',\'1\',\'0\',\'Kensington Market\',\'238 Augusta Avenue\',\'Toronto\',\'ON\',\'M5T 2L7\',43.6554,-79.4024,4,227,1,217)'))
  .then( result => console.log(result));