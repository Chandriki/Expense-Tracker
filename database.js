const { error } = require("console");
const mysql=require("mysql");
const express=require("express");
const bodyParser=require("body-parser");
const encoder=bodyParser.urlencoded();

const app=express();
app.use("/style1.css",express.static("style1.css"));
app.use("/index.html",express.static("index.html"));
app.use("/style.css",express.static("style.css"));
app.use("/login.html",express.static("login.html"));
app.use("/responsive.css",express.static("responsive.css"));
app.use("/app.js",express.static("app.js"));
app.use("/bb.js",express.static("bb.js"));
app.use("/gsap.js",express.static("gsap.js"));
app.use("/script.js",express.static("script.js"));
app.use("/about.html",express.static("about.html"));
app.use("/styles.css",express.static("styles.css"));






const connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"pass",
    database:"nodejs"
});

// connect to the database

connection.connect(function(error){
    if(error) throw error
    else console.log("connected to the database succesfully")

});

app.get("/",function(req,res){
    res.sendFile(__dirname + "/login.html");
})

app.post("/",encoder,function(req,res){
    var username=req.body.username;
    var password=req.body.password;

    connection.query("select *from loginuser where user_name=? and user_pass=?",[username,password],function(error,results,feilds){
        if(results.length>0){
            console.log("You have successfully Login");
            res.redirect("/");
        }else{
            res.redirect("/index.html");
        }
        res.end();
    })
})

// when login is success
app.get("/index",function(req,res){
    res.sendFile(__dirname + "/index.html")
})

//set app port
app.listen(4009);


// const express =require("express");
// const session=require("epress-session");
// const path=require("path");
// const pageRouter=require("./routes/pages");
// const app=express();

// //for body parser . to collect data that  sent from the client
// app.use(express.urlencoded({extended: false}));

// //serve static files, CSS ,images, jsfiles....etc
// app.use(express.static(path.join(__dirname,"publiic")));

// //Template enginr.PUG
// app.set("views",path.join(__dirname,"views"));
// app.set("view engine","pug");

// //session
// app.use(
//     session({
//         secret:"",
//         resave:false,
//         saveUninitialized: false,
//         cookie:{
//             maxAge:60*1000*30
//         }
//     })
// );

// //Routers
// app.use("/",pageRouter);

// //Errors =>page not found 404
// app.use((req,res,next)=>{
//     var err=new Error("Page not found");
//     err.status=404;
//     next(err);
// });

// //Handling errors (send them to the client)
// app.use((err,req,res,next)=>{
//     res.status(err.status || 500);
//     res.send(err.message);
// });

// //Setting up the server
// app.listen(3000,() => {
//     console.log("Server is running on port 3000...");
// });

// module.exports=app;