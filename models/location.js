var mongoose = require('mongoose');
var Schema = mongoose.Schema;

locationSchema = new Schema( {

  uniqueId: Number,
  name: String,
  fare: Number,
  no_of_slots: Number
},
{
  versionKey: false
}),
Location = mongoose.model('location', locationSchema);

module.exports = Location;