const express = require('express');
const router=express.Router();
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

// Define routes
router.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'html', 'signup.html'));
});

router.get('/signin', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'signin.html'));
  });

router.post('/signup',async (req,res)=>{
   try {
        const udata=req.body;
        const newdata=new data(udata);
        const response=await newdata.save();
        res.status(201).json({ message: 'User created successfully', user: response });
        console.log(newdata);
       
   } catch (err) {
    console.log(err);
   }


})
router.post('/signup',async (req,res)=>{
    try {
         const udata=req.body;
         const newdata=new data(udata);
         const response=await newdata.save();
         res.status(201).json({ message: 'User created successfully', user: response });
         console.log(newdata);
        
    } catch (err) {
     console.log(err);
    }
 
 
 })

 router.post('/signin',async (req,res)=>{
    try {
         const {email,password}=req.body;
         const user=await data.findOne({email:email});
         if(!user||user.password!=password)
         return res.status(401).json({error:"invalid username or password"});
         res.status(201).json({ message: 'User login successful'});
         console.log(user);
        
    } catch (err) {
     console.log(err);
    }
 
 
 })

 module.exports=router;