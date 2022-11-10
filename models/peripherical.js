var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

var periphericalDevice = new Schema({
  uid: { type: Number },
  vendor: { type: String },
  dateCreated: { type: Date },
  status: { type: String },  
});

module.exports = mongoose.model("Peripherical", periphericalDevice);
