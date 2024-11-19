const { mongoose } = require("mongoose");

const connetionString = process.env.DB_CONNECTION

mongoose.connect(connetionString).then(res=>{
    console.log("Database connected sucessfully with server");
}).catch(err=>{
    console.log("Database connection failed");
    console.log(err);
})