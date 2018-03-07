const mysql = require('mysql');

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'open_source_table_search'
});

con.connect(function(err) {
  if (err) throw err;
  console.log('Connected to mysql db!');
})

module.exports = con;