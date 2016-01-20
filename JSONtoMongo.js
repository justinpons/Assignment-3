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
mongoose.connect(config.db);

/* 
  Instantiate a mongoose model for each listing object in the JSON file, 
  and then save it to your Mongo database 
 */
fs.readFileAsync('listings.json', 'utf-8').then(function(resolve, reject) {
  var listings = JSON.parse(resolve);

  listings.forEach (function(listing) {
    var newListing = new Listing({
      code: listing.code,
      name: listing.name,
      coordinated: {
        latitude: listing.coordinate.latitude,
        longitude: listing.coordinates.longitude
      },
      address: listing.address,
    });

    newListing.save(function(eff, s){
      console.log(s);
    });
  });
});

/* 
  Once you've written + run the script, check out your MongoLab database to ensure that 
  it saved everything correctly. 
 */