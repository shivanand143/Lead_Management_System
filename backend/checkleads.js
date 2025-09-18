const mongoose = require("mongoose");
const Lead = require("./models/Lead"); // adjust path if needed

mongoose.connect("mongodb://localhost:27017/erino")
  .then(async () => {
    const leads = await Lead.find();
    console.log("Leads in DB:", leads);
    mongoose.connection.close();
  })
  .catch(err => console.error(err));
