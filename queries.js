/* required variables */
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

/* Fill out these functions using Mongoose queries*/

var findLibraryWest = function() {
  /* 
    Find the document that contains data corresponding to Library West,
    then log it to the console. 
   */

   Listing.find({ name: 'Library West' }, function(err, listing) {
    if (err) throw err;

    //object of the listing
    console.log('');
    console.log(listing);
    console.log('');
   });
};
var removeCable = function() {
  /*
    Find the document with the code 'CABL'. This cooresponds with courses that can only be viewed 
    on cable TV. Since we live in the 21st century and most courses are now web based, go ahead
    and remove this listing from your database and log the document to the console. 
   */

   Listing.findOneAndRemove({ code: 'CABL' }, function(err, listing) {
    if (err) throw err;

    //we have deleted the listing
    console.log("");
    console.log('CABL listing deleted!');
    console.log("");
   });
};
var updatePhelpsMemorial = function() {
  /*
    Phelps Memorial Hospital Center's address is incorrect. Find the listing, update it, and then 
    log the updated document to the console. 
   */

   Listing.findOne({name: 'Phelps Laboratory' }, function(err, listing) {
    if (err) throw err;

    // change the listing's address
    listing.address = '100 Phelps Lab, Gainesville, FL 32611, United States'

    // save the listing
    listing.save(function(err) {
      if (err) throw err;

      console.log('');
      console.log(listing.name, 'successfully updated!');
      console.log('');
    });
   });
};
var retrieveAllListings = function() {
  /* 
    Retrieve all listings in the database, and log them to the console. 
   */

   Listing.find({}, function(err, listings) {
    if (err) throw err;

    // object of all the users
    console.log("");
    console.log("Listings:");
    console.log(listings);
    console.log("");
   });
};

findLibraryWest();
removeCable();
updatePhelpsMemorial();
retrieveAllListings();