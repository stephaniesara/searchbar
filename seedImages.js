const images = require('./images.js');
const request = require('request');
const fs = require('fs');
const Promise = require('bluebird');

Promise.map(images.slice(0, 266), (image, i) => {
  const writeStream = fs.createWriteStream(`./public/images/${i + 1}.jpg`);
  return new Promise((res, rej) => {
      request.get(image.secure_url)
        .on('error', () => {
          console.log('Error getting image');
        })
        .pipe(writeStream)
        .on('finish', () => {
          console.log(`Wrote ${i + 1}.jpg`);
          writeStream.end();
          res();
        })
    });
})
  .then(() => {
    console.log(`Finished writing image files`);
  });