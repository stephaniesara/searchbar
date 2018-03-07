const Promise = require('Bluebird');
const fs = Promise.promisifyAll(require('fs'));

var starOptions = [];
for (i = 0; i < 31; ++i) {
	starOptions.push(2 + i / 10);
}

function addRatings(data) {
	data = JSON.parse(data);
	for (var row in data) {
		var choice = Math.floor(Math.random() * starOptions.length);
		data[row].stars = starOptions[choice];
	}
  return data;
}

fs.readFileAsync('./seeddata.js', 'utf8')
	.then(data => {
    return new Promise((res, rej) => {
      res(addRatings(data));
    });
  })
  .then(dataWithStars => {
    console.log('data', dataWithStars);
    return fs.writeFileAsync('./seeddatastars.js', JSON.stringify(dataWithStars));
  })
  .then(() => {
    console.log('Successfully wrote updated data to disk')
  })
  .catch(error => {
    console.log('Error while inserting stars', error);
  })
