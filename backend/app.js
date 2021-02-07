var express = require('express')
var bodyParser = require("body-parser");

const routePost = require('./routes/post')
const routeFund = require('./routes/fund')
const routeUser = require('./routes/user')

var app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept,Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE"
    );
    next();
  });


app.use("/post", routePost);
app.use("/fund", routeFund);
app.use("/user", routeUser);

module.exports = app;
