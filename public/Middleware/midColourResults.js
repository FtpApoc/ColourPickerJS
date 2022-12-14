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
      PaintName: `${req.PaintName}`,
      PaintRgb: `${req.PaintRgb}`
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

  // //Steamed Chestnut Colour
  // red = 211
  // green = 177
  // blue = 125

  const paintSchema = new mongoose.Schema({
    ColourName: String,
    RgbString: Number,
    DbR: Number,
    DbG: Number,
    DbB: Number
  })

  console.log("RGB", req.RgbData)

  PaintTesting =  mongoose.models.PaintQuery || mongoose.model("PaintQuery",paintSchema,"Paints")
  await PaintCollectionQuery()

  async function PaintCollectionQuery(){
    console.log("enters PaintCollectionQuery")
    let FoundPaint = false;
    //RGB increment
    // //setting upper and lower bounds for RgbData Red
    // let RgbDataRlb = parseInt(req.RgbData.R);
    // let RgbDataRub =  parseInt(req.RgbData.R);
    // console.log(RgbDataRlb+1,RgbDataRub+1)
    // //setting upper and lower bounds for RgbData Green
    // let RgbDataGlb = parseInt(req.RgbData.G);
    // let RgbDataGub = parseInt(req.RgbData.G);
    // //setting upper and lower bounds for RgbData Green
    // let RgbDataBlb = parseInt(req.RgbData.B);
    // let RgbDataBub = parseInt(req.RgbData.B);
    // const RgbDataBounds = [RgbDataRlb,RgbDataRub,RgbDataGlb,RgbDataGub,RgbDataBlb,RgbDataBub]

    let i = 1;
    let R = parseInt(req.RgbData.R);
    let G = parseInt(req.RgbData.G);
    let B = parseInt(req.RgbData.B);

    do {
      console.log("enters Do Statement")
      const Paint = await PaintTesting
      .where("DbR").lt((R)+i).gt((R)-i)
      .where("DbG").lt((G)+i).gt((G)-i)
      .where("DbB").lt((B)+i).gt((B)-i)
      //.select("ColourName")
      if ((Paint ) && (Paint != "")){
        console.log("PaintFound")
        FoundPaint = true
            const PaintName = ((Paint[0]["ColourName"]));
            const PaintR = ((Paint[0]["DbR"]));
            const PaintG = ((Paint[0]["DbG"]));
            const PaintB = ((Paint[0]["DbB"]));
            let PaintRgb = [PaintR,PaintG,PaintB];
            req.PaintName = PaintName;
            req.PaintRgb = PaintRgb;

            console.log("the req center",req.PaintName);
            next()
      } else {
        i += 1;
        console.log(i)
        FoundPaint = false;
        console.log(FoundPaint)
      }
    }
    while (FoundPaint === false);
  }
}


//still no clue
module.exports = ResultsRouter;
