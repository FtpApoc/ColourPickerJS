//This middleware is designed to call to a MongoDB database, with a query of a given RGB value, in order to return a paint name
//also used to render the Results page EJS.

const express = require('express');
const app = express();
const mongoCLient = require('mongodb').MongoCLient;

//instance of a router function to route to results
const ResultsRouter = express.Router();

//Rendering of the page should be last so all data is available to do when loaded
  //rendering the pgColourRes.ejs page with local variables
  ResultsRouter.route("/")
    .get(DataPull, CallToDataBase,(req,res) => {
    res.render('pages/pgColourRes',{
      //change the title to appropriate name
      title: "Colour Results",
      RgbData: `${req.RgbData}`
  });
});

//Retrieves Data and prepares it to be dealt with to
function DataPull(req,res,next){
  const RgbData = req.app.locals.RgbData;
  const RgbDataString = JSON.stringify(RgbData);
  req.RgbData = RgbDataString;
  console.log("TEST",RgbData)
  next()
}

function CallToDataBase(req,res,next){
  const url = 'mongodb://localhost:27017';
  const dbname = 'Paints';
  RgbData = req.RgbData
  console.log("CallToDataBase")

  async function mongo(){
    let client;
    try{
      client = await MongoClient.connect(url);

      console.log('connection to server');

      const db = client.db(dbname)
    } catch(error){
      console.log(error)
    }
  }
  next()
}

//still no clue
module.exports = ResultsRouter;
