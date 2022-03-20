const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/mayank")
.then( () => {
    console.log(`Connection Succesful`);
}).catch((err) => {
    console.log(`No Connection`);
})