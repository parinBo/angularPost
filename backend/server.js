var express = require('express')

const port = process.env.PORT || "3000"

var mongoose = require('mongoose')
mongoose
  .connect(
    "mongodb+srv://parinya:1234@mydatabase.no8lm.mongodb.net/test"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

var app = require('./app')
app.set("port",port)

var http = require('http')
var server = http.createServer(app)
server.listen(port)
