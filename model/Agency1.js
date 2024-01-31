const mongoose = require("mongoose");

const AgencySchema = new mongoose.Schema(
  {
    AgencyId: {
        type: String,
        require: true,
        unique: true,
      },    
    Name: {
      type: String,
      require: true,
    },
    Address1: {
      type: String,
      required: true,
    },
    Address2: {
      type: String,
    },
    State: {
      type: String,
      required: true,
    },
    City: {
      type: String,
      required: true,
    },
    PhoneNumber: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Agency1", AgencySchema);
