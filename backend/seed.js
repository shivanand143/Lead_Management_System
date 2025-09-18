// seed.js
const mongoose = require("mongoose");
const Lead = require("./models/Lead"); 
const { faker } = require("@faker-js/faker");

require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

const seedLeads = async () => {
  await Lead.deleteMany({}); 

  const leads = [];
  for (let i = 0; i < 100; i++) {
    leads.push({
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.number("##########"),
      company: faker.company.name(),
      city: faker.location.city(),
      state: faker.location.state(),
      status: faker.helpers.arrayElement(["New", "Contacted", "Qualified", "Lost"]),
      score: faker.number.int({ min: 0, max: 100 }),
      lead_value: faker.number.int({ min: 1000, max: 100000 }),
      is_qualified: faker.datatype.boolean(),
      last_activity_at: faker.date.recent(),
    });
  }

  await Lead.insertMany(leads);
  console.log("100 leads inserted");
  mongoose.disconnect();
};

seedLeads();

