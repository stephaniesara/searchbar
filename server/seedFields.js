const mysql = require('mysql');
const Promise = require('bluebird');
var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'open_source_table'
});

con.connect(function(err) {
  if (err) throw err;
  console.log('Connected to db!');
  seed()
});

con.query = Promise.promisify(con.query);
const table = 'open_source_table_about';
const vegetarian = [0, 1];
const byob = [0, 1];
const price = ['$', '$$', '$$$', '$$$$'];
const cuisine = ['Italian', 'Mexican', 'Filipino', 'American', 'French', 'Japanese', 'Chinese', 'Korean'];

var seed = function() {
  con.query(`select * from ${table}`)
    .then(data => {
      var queries = [];
      for (var i = 1; i <= data.length; ++i) {
        queries.push(con.query({
            
          })
        );
      }
      return Promise.all(queries);
    })
    .then()
}