//This middleware is designed to call to a MongoDB database, with a query of a given RGB value, in order to return a paint name
//also used to render the Results page EJS.

const express = require('express');
const app = express();
const mongoose = require('mongoose');

//instance of a router function to route to results
const ResultsRouter = express.Router();

//Rendering of the page should be last so all data is available to do when loaded
  //rendering the pgColourRes.ejs page with local variables
  ResultsRouter.route("/")
    .get(DataPull, CallToDatabase,(req,res) => {
    res.render('pages/pgColourRes',{
      //change the title to appropriate name
      title: "Colour Results",
      RgbData: `${req.RgbDataString}`,
      PaintName: `${req.PaintName}`
  });
});

//Retrieves Data and prepares it to be dealt with to
function DataPull(req,res,next){
  const RgbData = req.app.locals.RgbData;
  const RgbDataString = JSON.stringify(RgbData);
  req.RgbDataString = RgbDataString;
  req.RgbData = RgbData;
  //console.log("TEST",RgbData)
  next()
}

async function CallToDatabase(req,res,next){
  const url = 'mongodb://localhost:27017/ColourPickerJS';
  mongoose.set('strictQuery', true);
  mongoose.connect(url,
    () => {
      console.log("connected")
      //const collection = cl

  });

  //Steamed Chestnut Colour
  red = 211
  green = 177
  blue = 125

  const paintSchema = new mongoose.Schema({
    ColourName: String,
    RgbString: Number,
    DbR: Number,
    DbG: Number,
    DbB: Number
  })

  console.log("RGB", req.RgbData)
  console.log("RGB", req.RgbData.R)

  PaintTesting =  mongoose.models.PaintQuery || mongoose.model("PaintQuery",paintSchema,"Paints")
  //module.exports = PaintTesting
  await PaintCollectionQuery()

  async function PaintCollectionQuery(){
    const Paint = await PaintTesting
    .where("DbR").equals(req.RgbData.R)
    .where("DbG").equals(req.RgbData.G)
    .where("DbB").equals(req.RgbData.B)
    .select("ColourName")

    const PaintName = ((Paint[0]["ColourName"]));
    console.log(PaintName);
    req.PaintName = PaintName;
  }
  console.log("the req center",req.PaintName);
  next()
}

//still no clue
module.exports = ResultsRouter;
