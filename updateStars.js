const mysql = require('mysql');
const Promise = require('bluebird');
const db = mysql.createConnection({
  database: 'open_source_table',
  host: 'localhost',
  user: 'root',
  password: ''
});

db.connect(() => console.log('Connected!'));

db.query = Promise.promisify(db.query);

var rows = [];
for (var i = 1; i < 268; ++i) {
  rows.push(i);
}

var starOptions = [];
for (i = 0; i < 31; ++i) {
  starOptions.push(2 + i / 10);
}

Promise.map(rows, function(row) {
  var star = starOptions[Math.floor(Math.random() * starOptions.length)];
  console.log(star);
  return db.query(`update restaurants set stars = ${star} where iterator = ${row}`)
})
  .then(() => db.end());