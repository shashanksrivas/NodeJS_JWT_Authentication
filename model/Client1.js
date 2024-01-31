const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema(
  {
    ClientId: {
        type: String,
        require: true,
        unique: true,
      },    
    AgencyId: {
      type: String,
      require: true,
    },
    Name: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,      
    },
    PhoneNumber: {
      type: String,
      required: true,
    },
    TotalBill: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Client1", ClientSchema);
