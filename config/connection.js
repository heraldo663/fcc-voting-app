const mongoose = require("mongoose");
if (process.env.NODE_ENV === "development") {
  mongoose.connect(process.env.MONGO_URI_LOCAL, { useMongoClient: true });
} else if (process.env.NODE_ENV === "test") {
  mongoose.connect(process.env.MONGO_URI_TEST, { useMongoClient: true });
} else {
  mongoose.connect(process.env.MONGO_URI, { useMongoClient: true });
}

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("DB connected");
});
