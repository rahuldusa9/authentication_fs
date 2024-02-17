const express = require('express');
const path = require('path');
const db=require('./db');
const app = express();
const bodyparser=require('body-parser');
app.use(bodyparser.json())
const data=require('./schema/data');
app.use(express.urlencoded({ extended: true }));

// Serve static files (HTML, CSS)
app.use(express.static(path.join(__dirname, 'html')));
app.use('/css', express.static(path.join(__dirname, 'css')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'option.html'));
  });
// Define routes
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'html', 'signup.html'));
});

app.get('/signin', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'signin.html'));
  });

app.post('/signup',async (req,res)=>{
   try {
        const udata=req.body;
        const newdata=new data(udata);
        const response=await newdata.save();
        res.sendFile(path.join(__dirname, 'html', 'confirmation.html'));
        console.log(newdata); 
       
   } catch (err) {
    console.log(err);
   }


})
app.post('/signup',async (req,res)=>{
    try {
         const udata=req.body;
         const newdata=new data(udata);
         const response=await newdata.save();
         res.sendFile(path.join(__dirname, 'html', 'confirmation.html'));
         console.log(newdata);
        
    } catch (err) {
     console.log(err);
    }
 
 
 })

 app.post('/signin',async (req,res)=>{
    try {
         const {email,password}=req.body;
         const user=await data.findOne({email:email});
         if(!user||!(await user.comparePassword(password)))
         return res.status(401).json({error:"invalid username or password"});
         res.status(201).json({ message: 'User login successful'});
         console.log(newdata);
        
    } catch (err) {
     console.log(err);
    }
 
 
 })


// Start the server
app.listen(3000, () => {
  console.log("Server is running");
});
