 const express = require("express");
const chalk = require("chalk");
const debug = require("debug")("app.js");
const path = require("path");

const port = process.env.PORT || 3000;
const app = express();

//Express.JSON usage [NEEDS TO BE MOVED INTO RESULTS]
app.use(express.json());
//Post Request from RGB Form
app.post("/ColourRes", (request,response) => {
  const RgbData = {
    R : request.body.R,
    G : request.body.G,
    B : request.body.B,
  };

  response.send(request.body); //sending the data back to the client side
  console.log(RgbData)
})

app.set("view engine", "ejs");
app.use(express.static("public"));
//setting alternate paths for bootstrap to the program to look in /public first, then /bootstrap/dist for relevant css and js files
app.use('/css', express.static(path.join(__dirname,'/node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname,'/node_modules/bootstrap/dist/js')))

//NavList used to populate nav-bar in prtNavigation.ejs
navList = [
  {href:'/ColourExt',label:'Colour Extraction Tool'},
  {href:'/RgbInput',label:'RGB Input'},
  {href:'/History',label:'History'}
]

//Automatic Rendering of the home page on entry to the site.
app.get('/',function(req,res){
  res.render('pages/pgHomePage',{
    title: "Home Page"
  })
});

//Colour Extraction Router, which is called from the home page or nav-bar
const ColourExtRouter = require('./public/Middleware/midColourExt');
app.use('/ColourExt', ColourExtRouter)

//InputRGB router, which is called from the home page or nav-bar
const RgbInputRouter = require('./public/Middleware/midRgbInput');
app.use('/RgbInput', RgbInputRouter)

//History router, which can be called from the home page or nav-bar
const HistoryRouter = require('./public/Middleware/midHistory');
app.use('/History',HistoryRouter);

//Extract Results middleware, between ColourExt and ColourRes [NEEDS TO BE MOVED]
const ResultsRouter = require('./public/Middleware/midViewResults');
app.use('/ColourRes',ResultsRouter);

//call to listen for code on
app.listen(port, function(){
  console.log(`listening on port ${chalk.green(port)}`);
})
