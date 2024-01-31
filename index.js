const express = require('express');
const bodyparser=require("body-parser");
const mongoose= require('mongoose');
const jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');
const port = process.env.PORT || 3000;
const app = express();
require('dotenv').config();
const bcrypt = require('bcryptjs');
const salt = 10;
const User1 = require("./model/User1");
const Agency1 = require("./model/Agency1");
const Client1 = require("./model/Client1");

app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use(cookieParser());
app.use(express.static("public"));

// get our urls and secrets
const JWT_SECRET="process.env.jwt";

mongoose.connect("mongodb+srv://shashank:Password_123@facebookdb.5sfnbit.mongodb.net/facebookdb?retryWrites=true&w=majority"
    ,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log("Connected to MongoDB");
    }
  );

  const verifyToken = (token)=>{
    try {
        const verify = jwt.verify(token,JWT_SECRET);
        console.log(verify)
        if(verify.type==='user'){return true;}
        else{return false};
    } catch (error) {
        console.log(JSON.stringify(error),"error");
        return false;
    }
}

app.post("/signup", async (req, res) => {
    try {
      //generate new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
      //create new user
      const newUser = new User1({
        email: req.body.email,
        password: ""+hashedPassword, 
      });
  
      //save user and respond
      const user = await newUser.save();
      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json(err)
    }
  });

const verifyUserLogin = async (email,password)=>{
    try {
      console.log(User1)
        const user = await User1.findOne({email:email})
        console.log(user)
        if(!user){
            return {status:'error',error:'user not found'}
        }
        if(await bcrypt.compare(password,user.password)){
            // creating a JWT token
            token = jwt.sign({username:user.email,type:'user'},JWT_SECRET)
            return {status:'ok',data:token}
        }
        return {status:'error',error:'invalid password'}
    } catch (error) {
        console.log(error);
        return {status:'error',error:'timed out'}
    }
}

  app.get('/',(req,res)=>{
    // console.log(req.body.cookie)
	const token=req.body.cookie;
  console.log(token)
    if(verifyToken(token)){
        return res.status(200).json("valid token")
    }else{
        return res.status(500).json("invalid token")
    }
})

app.post('/login',async(req,res)=>{
  const {email,password}=req.body;
  // we made a function to verify our user login
  const response = await verifyUserLogin(email,password);
  if(response.status==='ok'){
      // storing our JWT web token as a cookie in our browser
      //1 minute experies
      res.cookie('token',token,{ maxAge: 60000}); 
      return res.json(response)
  }else{
      res.json(response);
  }
})

app.post("/createAgencyClient", async (req, res) => {
  try {
    //create new Agency
    const newAgency = new Agency1({
      AgencyId: req.body.agentid,
      Name: req.body.agentname,
      Address1: req.body.agentaddress1,
      Address2: req.body.agentaddress2,
      State: req.body.agentstate,
      City: req.body.agentcity,
      PhoneNumber: req.body.agentphonenumber,
    });

    const newClient = new Client1({
      ClientId: req.body.clientid,
      AgencyId: req.body.agentid,
      Name: req.body.clientname,
      Email: req.body.clientemail,
      PhoneNumber: req.body.clientphonenumber,
      TotalBill: req.body.clienttotalbill,
    });

    //save user and respond
    const agency = await newAgency.save();
    const client = await newClient.save();

    return res.status(200).json("account created");
  } catch (err) {
    return res.status(500).json(err)
  }
});


//update the client details
app.put("/client/:id", async (req, res) => {
  try {
    const client = await Client1.findOne({ClientId:req.params.id});
    console.log(client,client.ClientId,req.body.ClientId)
    if (client.ClientId === req.body.ClientId) {
      await client.updateOne({ $set: req.body });
      return res.status(200).json("the client has been updated");
    } else {
      res.status(403).json("you can update only your data");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});



//get the maximum value according to  maximum total bill
app.get("/maximum", async (req, res) => {
  try {
    const allclients = await Client1.findOne().sort({"TotalBill":-1}).limit(1);
    const maximumvalue=allclients.TotalBill
    console.log(allclients,maximumvalue)
    const allmaxclients = await Client1.find({"TotalBill":maximumvalue});
    console.log(allmaxclients)
    res.status(200).json(allmaxclients);
  } catch (err) {
    res.status(500).json(err);
  }
});



app.listen(port,()=>{
  console.log(`Running on port ${port}`);
})

