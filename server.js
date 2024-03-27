const express = require("express");
const sql = require("mysql2")
const app = express();
const bcrypt = require("bcrypt"); //importing bcrypt package
var db = require("./database");
var path = require('path')
app.use(express.static(path.join(__dirname, 'public')))
// var router = express.Router();

// router.post("/login", (req, res, next) => {
// addUser(req, res, next);
// });

// addUser = (req, res, next) => {
app.use(express.urlencoded({ extended: false }));

// Inserting the customer details into the database 
app.post("/register", async (req, res) => {

        // const hashedPassword = await bcrypt.hash(req.body.user_password)
        var firstName = req.body.first_name;
        var lastName = req.body.last_name;
        var email = req.body.user_email;
        var phoneNumber = req.body.phone_number;
        var password = req.body.user_password;
        var sql = `INSERT INTO customer (LastName, FirstName , Phone_no, email, user_password ) VALUES (?, ?, ?, ?, ?)`;
        db.query(sql, [lastName, firstName, phoneNumber, email, password], function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/login");
            
        }
    
    });
    // console.log(hashedPassword);
    });
// End of entering registration data.

// Login page
app.post("/login", async (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    var sql = `SELECT * FROM customer WHERE email =? and user_password =?`;
    db.query(sql, [email, password], function (err, result) {
        if (err) {
            console.log(err)
        } 
        else {
            console.log(result)
            console.log(result.length)
            if(result.length == 1){
            res.redirect('/');  
            
            }
            else {
                res.redirect('/register');  
                
            }
        }
    })
});
// End of login page




// this is for rendering the html pages
// Routes
    app.get("/", (req, res) => {
    res.render("index.ejs");
    });

    app.get("/login", (req, res) => {
    res.render("login.ejs");
    });

    app.get("/register", (req, res) => {
    res.render("register.ejs");
    });
// End routes

// PORT Number
app.listen(7000);
