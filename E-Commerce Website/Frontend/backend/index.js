const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require ("path");
const cors = require("cors");
const { error } = require("console");
const exp = require("constants");


app.use(express.json());
app.use(cors());


//Database connection with mangoDB

mongoose.connect("mongodb+srv://kavanah06:Kavanah1992@cluster0.hwaictv.mongodb.net/MOMSTOP");


//API Creation


app.get("/",(req,res)=>{

    res.send("Express app is running");

});


//Image Storage Engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename:(req,file,cb)=>{

        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)

    }
})



const upload = multer({storage:storage})

//Creating Upload Endpoint for Images


app.use('/images',express.static('upload/images'));

app.post("/upload", upload.single('product'), (req, res) => {
    console.log("File uploaded:", req.file); // Log the file information

    if (req.file) {
        res.json({
            success: 1,
            image_url: `http://localhost:${port}/images/${req.file.filename}`
        });
    } else {
        res.status(400).json({ error: "No file uploaded" });
    }
});


//Schema for Creating Products

const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    },
});


app.post('/addproduct', async (req, res) => {
    let products = await Product . find({});
    let id;
    if(products.length>0)
    {
        let last_product_array = products .slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id+1;
    }
    else{
        id =1;
    }

    

    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });

    console.log(product);

    try {
        await product.save();
        console.log("Saved");
        res.json({
            success: true,
            name: req.body.name,
        });
    } catch (error) {
        console.error("Error saving product:", error);
        // Return a meaningful error message
        res.status(400).json({ error: "Product validation failed: " + error.message });
    }
});


//Creating  API for deleting Products

app.post('/removeproduct', async (req,res)=>{

    await Product.findOneAndDelete({id:req.body.id});

    console.log("Removed");

    res.json({
        success: true,
        name:req.body.name
    })

}) 

//Creating API for getting all products
app.get('/allproducts',async (req,res)=>{
    let products = await Product.find({});
    console.log("All Products Fetched");
    res.send(products);



})

//Schema Creating for user  model
 const Users = mongoose.model('Users',{
     name:{
        type:String,

     },
     email:{
        type:String,
        unique:true,
     },
     password:{
        type:String,
     },
     cartData:{
        type:Object,
     },
     date:{
        type:Date,
        default:Date.now,
     }

 })


 //Creating Endpoint for registering the user
 app.post('/signup',async(req,res)=>{
    let check = await Users.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({success:false,error:"existing user found with same email Id"})
    }
    let cart ={};
    for(let i=0; i<300; i++){
        cart[i]=0;
    }
    const user = new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })

    await user.save();
    const data ={
        user:{
            id:user.id
        }
    }

    const token = jwt.sign(data,'secret_ecom');
    res.json({success:true,token})
 })

 //Creating endpoint for user login
 app.post('/login',async (req,res)=>{
    let user = await Users.findOne({email:req.body.email});
    if(user){
        const passCompare = req.body.password === user.password;
        if(passCompare){
            const data ={
                user:{
                    id:user.id
                }
            }

            const token = jwt.sign(data,'secret_ecom');
            res.json({success:true,token});

        }
        else{
            res.json({success:false,error:"wrong password"});
        }
    }
     else{
        res.json({success:false,error:"wrong email id"})
     }

 })

 //Creating Endpoint for newcollection data
 app.get('/newcollections',async (req,res)=>{
    let products = await Product .find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("Newcollection fetched");
    res.send(newcollection);

 })

 //Creating endpoint for popular in women section
 app.get('/popularinwomen',async(req,res)=>{
    let products = await Product.find({category:"women"});
    let popular_in_women = products .slice(0,4);
    console.log("Popular in women fetch");
    res.send(popular_in_women);

 })

 //Creating Middleware to fetch user
 const fetchUser = async (req,res,next) =>{
    const token = req.error('auth-token');
    if(!token){
        res.status(401).send({errors:"Please authenticate using valid token"})
    }
    else{
        try{
            const data = jwt . verify(token,'secret_ecom');
            req.user = data.user;
            next();

        } catch (error){
            response.status(401).send({errors:"please authentyicate valid token"})

        }
    }
 }

 //Creating endpoint for adding products for adding Products in cartdata
 app.post('/addtocart',fetchUser,async (req,res)=>{
    console.log("Added",req.body.itemId);
    let userdata = await Users.findOne({_id:req.user.id});

    userdata.cartData[req.body.itemId] += 1;
    await Users. findOneAndUpdate({_id:req.user.id},{cartData:userdata.cartData});
    res.send("Added")

 })

 //Creating Endpoint to remove product from cartdata
 app.post('/removefromcart',fetchUser,async(req,res)=>{
    console.log("removed",req.body.itemId);
    let userdata = await Users.findOne({_id:req.user.id});
    if( userdata.cartData[req.body.itemId]>0)

    userdata.cartData[req.body.itemId] -= 1;
    await Users. findOneAndUpdate({_id:req.user.id},{cartData:userdata.cartData});
    res.send("Removed")


 })

 //creating endpoint to get cartdata
 app.post('/getcart',fetchUser,async (req,res)=>{
    console.log("GetCart");
    let userdata = await Users.findOne({_id:req.user.id});
    res.json(userdata.cartData);

 })












app.listen(port,(error)=>{
    if(!error){
        console.log("Server running on Port " + port)
    } 

    else
    {
        console.log("Error : " +error)
    }
})


