var express = require("express");
var app = express();
var PORT = 8080;
var passport = require("passport");
var session = require("express-session");
var bodyParser = require("body-parser");
var env = require('dotenv').load();
var exphbs = require('express-handlebars');

//Routes
var authRoute = require('./app/routes/auth.js')(app);
//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

// For Passport
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.get('/', function(req,res){
  res.send("Passport with Sequelize Demo");
});

//For Handlebars
app.set('views', './app/views')
app.engine('hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');


//Models
var models = require("./app/models");

var authRoute = require('./app/routes/auth.js')(app,passport);

//Sync Database
models.sequelize.sync().then(function() {

    console.log('Nice! Database looks fine')

}).catch(function(err) {

    console.log(err, "Something went wrong with the Database Update!")

});

app.listen(PORT, function() {
  console.log("App listening on http://localhost:%s " , PORT);
});
