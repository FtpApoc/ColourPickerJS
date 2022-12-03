 const express = require("express");
const chalk = require("chalk");
const debug = require("debug")("app.js");
const path = require("path")

const port = process.env.PORT || 3000;
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
//setting alternate paths for bootstrap to the program to look in /public first, then /bootstrap/dist for relevant css and js files
app.use('/css', express.static(path.join(__dirname,'/node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname,'/node_modules/bootstrap/dist/js')))

//LandingPage

app.get('/',function(req,res){
  res.render('pages/HomePage',{
    title: "Home Page"
  })
});

app.get('/RgbInput',function(req,res){
  res.render('pages/RgbInput',{
    title: "RGB Input"
  });
});

app.get('/ColourExt',function(req,res){
  res.render('pages/ColourExt',{
    title: "Colour Extractor"
  });
});

//Extract Results middleware, between ColourExt and ColourRes
const ResultsRouter = require('./Middleware/midExtractResults');
app.use('/ColourRes',ResultsRouter)

app.get('/history',function(req,res){
  res.render('pages/history',{
    title: "History"
  })
})

//call to listen for code on
app.listen(port, function(){
  console.log(`listening on port ${chalk.green(port)}`);
})
