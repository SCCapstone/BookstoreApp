//database used is mongoose - MongoDB to store our data for users, book information, etc...
const mongoose = require("mongoose");

module.exports = () => {
  //@params - useNewUrlParser - parses through a new url and is stored (set to true assuming it works), useUnifiedTopology - used for correct mapping and also set initially to true
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  //in a try-catch method where it "tries" to connect to the database and in the console log it says that that it is connected successfully
  //if it fails then it throws and error and displays the error message in the log console
  try {
    mongoose.connect(
      "mongodb+srv://adminuser:bufferoverload@bufferove0.xdlugt6.mongodb.net/?retryWrites=true&w=majority",
      connectionParams
    );
    console.log("Connected to database successfully");
  } catch (error) {
    console.log(error);
    console.log("Could not connect database!");
  }
};
