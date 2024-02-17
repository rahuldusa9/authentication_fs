const mongoose=require('mongoose');

require('dotenv').config();

const mongoURL=process.env.DB_URl;

mongoose.connect(mongoURL,{
    useNewUrlParser:true,
   useUnifiedTopology:true
});

const db=mongoose.connection;

db.on('connected',()=>{
    console.log("connected to db");
});

db.on('error',(err)=>{
    console.log("the error is",err);
});


db.on('disconnected',()=>{
    console.log("disconnected to db");
});

module.exports=db;

