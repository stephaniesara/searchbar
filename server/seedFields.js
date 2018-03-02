const mysql = require('mysql');
const Promise = require('bluebird');
var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'open_source_table'
});

db.connect(function(err) {
  if (err) throw err;
  console.log('Connected to db!');
});

db.query('use open_source_table;');

const vegetarian = [0, 0, 0, 1];
const byob = [0, 0, 0, 0, 0, 1];
const price = ['$', '$$', '$$', '$$$', '$$$', '$$$$'];
const cuisine = ['Italian', 'Mexican', 'Filipino', 'American', 'American', 'Italian', 'French', 'Japanese', 'Chinese', 'Korean'];

const gen = item => {
  return item[Math.floor(Math.random() * item.length)];
};

db.query = Promise.promisify(db.query);

var inserts = [];
for (var i = 1; i <= 267; ++i) {
  inserts.push(db.query(`update open_source_table_about
      set cuisine = '${gen(cuisine)}',
      price = '${gen(price)}',
      vegetarian = ${gen(vegetarian)},
      byob = ${gen(byob)}
      where iterator = ${i}`
    )
  );
};

Promise.all(inserts)
  .then(() => {
    return db.query(`select * from open_source_table_about limit 3`)
    })
  .then((result) => {
    console.log(result);
    db.end();
  });
