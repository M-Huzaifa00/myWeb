const express = require("express")
const bodyParser = require("body-parser")
const app = express();

app.use(bodyParser.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.sendFile(__dirname +  "/cal.html")
})

app.post("/",(req,res)=>{
    let num1 = parseInt(req.body.num1);
    let num2 =parseInt(req.body.num2);
    let result = (num1 + num2)
    res.send("SUM : " + result )


})

app.get("/bc",(req,res)=>{
    res.sendFile(__dirname +  "/bmi.html")
})

app.post("/bc",(req,res)=>{
    let num1 = parseInt(req.body.num1);
    let num2 =parseInt(req.body.num2);
    let result = (num1/Math.pow(num2,2))*730
    res.send("BMI : " + result )


})
 
app.listen(3000,()=>{
    console.log("server started at host : 3000")
})