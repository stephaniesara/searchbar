const mysql = require('mysql');
const fs = require('fs');
const db = mysql.createConnection({
	database: 'open_source_table',
	host: 'localhost',
	user: 'root',
	password: ''
});

db.connect(() => console.log('Connected!'));

db.query('select * from open_source_table_about', (err, data) => {
	if (err) throw new Error;
	db.end();
	fs.writeFile('./seeddata.js', JSON.stringify(data), () => {
		console.log('Finished')
	}); 
});
