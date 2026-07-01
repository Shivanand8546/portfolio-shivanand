const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL, {
    tls: true,
    serverSelectionTimeoutMS: 30000,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to MongoDB ......"));

db.once('open', function () {
    console.log('Connected to Database :: Mongodb');
});

module.exports = db;