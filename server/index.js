const express = require('express');
const parser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
let app = express();

app.use(morgan('dev'));

app.use(parser.json());

app.use(express.static(path.join(__dirname, '../public')));

app.get('/images/:id', function(req, res) {
  console.log('here');
  res.set('Content-Type', 'image/jpeg').sendFile(path.join(__dirname, `../public/images/${req.params.id}`), function(err, data) {
    if (err) {
      console.log('Error sending file');
    } else {
      console.log('Sent', req.params.id, data);
    }
  });
});

let port = 3004;

app.listen(port, function() {
  console.log(`Listening on port ${port}!`);
});
