require('dotenv').config();

let express = require('express');
const bodyParser = require('body-parser')
let app = express();

// const fun1 = bodyParser.urlencoded({extended:false});
app.use(bodyParser.urlencoded({extended:false}))

app.use(function(req,res,next){
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
})


app.route("/name") //get and post both can be chained together for same path.
.get(
    (req,res)=>{
        res.send({name:`${req.query.first} ${req.query.last}`});
    }
)
.post(
    (req,res) =>{
        res.send({name:`${req.body.first} ${req.body.last}`});
    }
)


app.get(
    `/:word/echo`, //:word becomes a variable
    (req,res,next)=>{
        res.send({echo:req.params.word});
    }
)
app.get("/now",
    (req,res,next)=>{
        req.time = new Date().toString();
        next();
    },
    (req,res)=>{
        res.send({time:req.time});
    }
)


app.use("/public", express.static(__dirname + "/public")); ///serves static file at the given path
console.log("Hello World")
// app.get("/",function(req,res){
//     res.send("Hello Express")
// })
app.get("/",function(req,res){
    res.sendFile(__dirname+'/views/index.html')
})
app.get("/json",(req,res)=>{
    // console.log(process.env.MESSAGE_STYLE);
    const message = process.env.MESSAGE_STYLE == "uppercase" ? "HELLO JSON" : "Hello json";
    res.json({message:message});
})
module.exports = app;
