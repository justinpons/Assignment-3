'use strict';
/* 
  Import modules/files you may need to correctly run the script. 
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'), 
    config = require('./config');

/* Connect to your database */
console.log("Attempting to connect to database...");
mongoose.connect(config.db.uri);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
console.log("Connected to Database!");

/* 
  Instantiate a mongoose model for each listing object in the JSON file, 
  and then save it to your Mongo database 
 */

var listingData = JSON.parse(fs.readFileSync('./listings.json', 'utf8')).entries;

var counter = 0;
var callback = function(err){
  counter++;
  if(err) throw err;
  if (counter == listingData.length) {
    console.log('Listings added.');
    process.exit(0);
  }
}

for(var i = 0; i < listingData.length; i++){
  new Listing(listingData[i]).save(callback);
  console.log(listingData[i]);
}

/* 
  Once you've written + run the script, check out your MongoLab database to ensure that 
  it saved everything correctly. 
 */