const express = require("express");
const session = require('express-session');
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const port = 3000;

// Connect With MongoDB Server
mongoose
  .connect("mongodb://localhost:27017/Amazon")
  .then(() => {
    console.log("Connected with MongoDB");
  })
  .catch((err) => {
    console.log(`Something went wrong ${err}`);
  });

// Data Scheema
const DataSchema = new mongoose.Schema(
  {
    name : String,
    email: String,
    password: String,
  },
  {
    versionKey: false,
  }
);

// Use Session For Track Data
app.use(session({
  secret : "mySecretKey",
  resave : false,
  saveUninitialized : true,
  cookie: {
    maxAge: 1000 * 60 * 60 
  }
}));

// Create a Model
const UserData = mongoose.model("UserData", DataSchema);

// join Public path  
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Join View path for Render the ejs files
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Signup page
app.get("/", (req, res) => {
  res.render("login.ejs");
});

app.post("/", async (req, res) => {
  const {email} = req.body;

  const user = await UserData.findOne({ email });
  if (! user) {
    return res.json({success:false,redirect:"/create"});
  }
  req.session.email = email;
  return res.json({success:true});
});

// password page
app.get("/pass", (req, res) => {
  res.status(200).render("pass.ejs");
});

app.post("/pass", async (req, res) => {
  const email = req.session.email;
  const {password} = req.body;

  if(!email) return res.redirect("/");
  // if(email){
  //   res.json({ms : `${email}`})
  // }
  const user = await UserData.findOne({email,password});
  
  if(!user) return res.json({success : false,message:"you enter the wrong password"});

  return res.json({success : true});
});

//Forget password
app.get('/forget',(req,res)=>{
  res.render('forget.ejs');
});

app.post('/forget',async(req,res)=>{
  const email = req.session.email;
  const {newPassword,confirmPassword} = req.body;

  if(!req.session.email) return res.redirect("/");

  if(!email) return res.redirect("/");

  if (newPassword !== confirmPassword) {
    return res.json({success:false,ms : "password are not same"});
  }
 
  try{
    await UserData.updateOne(
    {email},
    {$set : {password : newPassword}}
  );
  return res.json({success:true});
    
  }catch(err){
    return res.json({success:false,ms:"Server error"});
  }
});

app.get("/create", (req, res) => {
  res.render("create.ejs");
});

app.post("/create",(req,res)=>{
  res.redirect("/signup");
});

app.get('/signup',(req,res)=>{
  res.render('signup.ejs');
});

app.post('/signup',async(req,res)=>{
  const {name,email,password} = req.body;
  try{
  const userEmail = await UserData.findOne({email});
  console.log(userEmail);
  if(userEmail) return res.json({success : false,message:`${email} is alrady exist`});
  
  const userdata = new UserData({name,email,password});
  
   userdata.save();
   res.json({success : true});
  }
  
    catch(err){
      console.log('something went wrong ',err);
      res.send("something went wrong");
    };
});


app.get("/home", (req, res) => {
  res.render("amazon.ejs");
});
app.listen(port, () => {
  console.log(`Server is listening at http://127.0.0.1:${port}`);
});
