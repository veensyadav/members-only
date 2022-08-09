const express                                        = require('express');
const app                                            = express();
const {connectMongoose, User, Post}                  = require("./db.js");
const passport                                       = require("passport");
const ejs                                            = require("ejs");
const { initializingPassport, isAuthenticated }      = require('./passportConfig.js');
const expressSession                                 = require("express-session");
const path                                           = require("path");
const hbs                                            = require("hbs");
app.set('view engine',"hbs");
// const expressLayouts                                 = require("express-ejs-layouts")


connectMongoose();

initializingPassport(passport);

app.use(express.static(__dirname +'/views'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(expressSession({secret:"secret", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
// app.use('/css', express.static(__dirname + 'public/css'))
const bcrypt = require("bcrypt");

app.set('views', path.join(__dirname, 'views'));
app.set("view engine","ejs","hbs");



app.get("/",(req,res)=> {
    res.render("index");
});
app.get("/register", (req,res) => {
    res.render("register");
});
app.get("/login", (req,res) => {
    res.render("login");
});
app.get("/post_form", (req,res) => {
    res.render("post_form");
})
app.get("/postshow", (req,res) => {
    res.render("postshow");
})




app.post("/register",async (req,res) => {

    const user = await User.findOne({ username: req.body.username});
    
    if(user) {
        return res.status(400).send("User already exists");
    }
    else if(req.body.password != req.body.confirm_pw){
        // res.render('sign-up',{title:'Sign-Up',msg:'Password not matched with confirmPassword'});
        return res.status(400).send("Password does not match");
    }
    else{
        // async function hashPassword(Password) {
        //     const hash = await bcrypt.hash(Password, 10);
        //     const newUser = await User.create(req.body);
        // }
        const newUser = await User.create(req.body);

        // res.status(201).send(newUser);
        res.redirect("/login");
    }

});


app.post("/login",passport.authenticate("local",{ failureRedirect : "/register", successRedirect : "/post_form" }));


app.get("/profile", isAuthenticated, (req,res) => {
    res.send(req.user);
});


app.get("/logout", (req, res) => {

    req.logout(req.user, err => {
        if(err) return next(err);
        res.redirect("/login");
      });
    
});


// For posting a Post


app.post("/send", async(req, res) => {
    console.log("its running 2: " + req.body);
    
    Post.create(req.body, (err, data) => {
      if (err) return console.log(err);
      res.send("saved to db: " + data);
    });
    res.redirect("/postshow")
  });



app.get("/message", (req, res) => {

    Post.find({}, function(err, users) {
        console.log("users");
        var userMap = {};
        users.forEach(function(user) {
            userMap[user._id] = user;
        })
        res.send(userMap);
        
    })
})




app.listen(3000, () => {
    console.log("listening port number 3000");
});
