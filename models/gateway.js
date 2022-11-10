const validator = require("validator");
var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

var gateway = new Schema({
  serialNumber: { type: String, unique: true, trim: true },
  humanReadableName: { type: String },
  ipv4Address: {
    type: String,
    validate(value) {
      if (!validator.isIP(value)) {
        throw new Error("Please enter correct IP");
      }
    },
  },
  peripheralDevices: [
    {
      uid: { type: Number },
      vendor: { type: String },
      dateCreated: { type: Date },
      status: { type: String },
    },
  ],
});

module.exports = mongoose.model("Gateway", gateway);
