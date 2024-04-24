const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const databaseConnect = async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Connection to db successful");
  } catch (error) {
    console.error("DB error:", error);
  }
}

module.exports = databaseConnect;
