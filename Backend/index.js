const express = require("express")
const app = express()
require("dotenv").config()
const route = express.Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const log = console.log
let port = 2000
let mongo = require("mongoose")
let {body, validationResult} = require("express-validator")
let cors = require("cors")
app.use(express.json())
mongo.connect(process.env.uri).then(()=>{
    log("Database connected!")
})
let db = mongo.connection
let users = db.collection("Users")
let orders = db.collection("Orders")
let inventory = db.collection("Inventory")
let history = db.collection("History")

function generateOrderId() {
    const date = new Date();
    const formattedDate = date.toISOString().replace(/[-:T.]/g, '').slice(0, 14);
    const randomNumber = Math.floor(1000 + Math.random() * 9000);

    return `ORD-${formattedDate}-${randomNumber}`;
}  
function generateCustomerId() {
    const timestamp = Date.now().toString().slice(-6);
    const randomNum = Math.floor(1000 + Math.random() * 9000);
  
    return `CUST-${timestamp}-${randomNum}`;
}  

app.use(cors({
    "origin":["http://localhost:5173", "http://localhost:5174"]
}))

app.use(route)

route.post("/vendorLogin", async(req, res)=>{
    let data = req.body
    log(data)
    if(data.username == "Vendor" && data.password == "ManjuNathVendor"){
        let token = await jwt.sign({"id":data.username}, process.env.secret)
        return res.json({"token":token, "status":"success"})
    }else{
        return res.json({"status":"fail"})
    }
})

route.post("/deliver-order", async(req, res)=>{
    let data = req.body
    let token = req.headers.token
    let verify = await jwt.verify(token, process.env.secret)
    if(verify){
        let finder = await orders.findOne({"orderId":data.orderId}, {"_id":-1})
        let historyy = await history.insertOne(finder)
        let pro = await inventory.updateOne({"id":data.product}, {$inc:{quantity:-Number(data.quantity)}})
        await orders.deleteOne({"orderId":data.orderId})
        let prop1 = await inventory.find({id:Number(data.product)}).toArray()
        if(finder){
            return res.json({"status":"delivered"})
        }else{
            return res.json({"status":"fail"})
        }
    }else{
        return res.json({"stauts":"fail"})
    }
})

route.post("/getQuantity", async(req, res)=>{
    let header = req.headers    
    let verify = await jwt.verify(req.headers.token, process.env.secret)
    if(verify){
        let items = await inventory.find({id:req.body.id}).toArray()
        return res.json(items)
    }
})

route.post("/setQuantity", async(req, res)=>{
    let header = req.headers
    let verify = await jwt.verify(req.headers.token, process.env.secret)
    if(verify){
        let changed = await inventory.updateOne({id:req.body.id}, {$set:{quantity:Number(req.body.quantity)}})
        if (changed){
            log(req.body.id, req.body.quantity)
            return res.json({"status":"success"})
        }else{
            return res.json({"status":"fail"})
        }
    }else{
        return res.json({"status":"fail"})
    }
})

route.post("/fetchOrders", async(req, res)=>{
    let token = req.headers.token
    let verify = await jwt.verify(token, process.env.secret)
    if(verify){
        let orderss = await orders.find().toArray()
        if(orderss){
            return res.json(orderss)
        }else{
            return res.json({"status":"fail"})
        }
    }else{
        return res.json({"status":"fail"})
    }
})

route.post("/createUser", [
    body("name").isAlpha().withMessage("Malicious characters!"),
    body("email").isEmail().withMessage("Enter valid email!"),
],async(req, res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.json({"status":"fail"})
    }
    let data = req.body
    let finder = await users.findOne({"email":data.email})
    if(!finder){
        let salt = await bcrypt.genSalt(10)
        let hash = await bcrypt.hash(data.password, salt)
        let custId = generateCustomerId()
        let creator = await users.insertOne({"name":data.name, "email":data.email, "password":hash, "custId":custId})
        if(creator){
            log({"status":"success", creator:custId})
            return res.json({"status":"success", "custId":custId})
        }
    }else{
        return res.json({"status":"email"})
    }
    res.json(finder)
})

route.post("/giveOrder", [body("quantity").isNumeric()] ,async(req, res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.json({"status":"fail"})
    }
    let data = req.body
    let inserter = await orders.insertOne({"quantity":data.quantity, "id":data.id, "orderId":generateOrderId(), "custId":data.custId})
    if(inserter){
        return res.json({"status":"success"})
    }else{
        return res.json({"status":"fail"})
    }
})

route.post("/userLogin", async(req, res)=>{
    let data = req.body
    if(data.email){
        let finder = await users.find({"email":data.email})
        if(finder){
            if(data.password){
                let checker = await bcrypt.compare(data.password, finder.password)
                if(checker){
                    return res.json({"status":"success"})
                }else{
                    return res.json({"status":"fail"})
                }
            }
        }
    }else{
        return res.json({"status":"email"})
    }
})

app.listen(port, ()=>{
    log("Connected server!")
})