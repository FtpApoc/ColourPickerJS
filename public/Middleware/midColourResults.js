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
      RgbData: `${req.RgbDataArray}`,
      PaintName: `${req.PaintName}`,
      PaintRgb: `${req.PaintRgb}`
  });
});

//Retrieves Data and prepares it to be dealt with to
function DataPull(req,res,next){
  const RgbDataObject = req.app.locals.RgbData;
  RgbDataArray = [RgbDataObject["R"],RgbDataObject["G"],RgbDataObject["B"]]
  req.RgbData = RgbDataObject;
  req.RgbDataArray = RgbDataArray;
  next()
}

async function CallToDatabase(req,res,next){
  const url = 'mongodb+srv://dbUser:PasswordForTesting@colourpickerjs.jwzryq7.mongodb.net/ColourPickerJS?retryWrites=true&w=majority';
  mongoose.set('strictQuery', true);
  mongoose.connect(url,
    () => {
      console.log("connection")
  });

  const paintSchema = new mongoose.Schema({
    ColourName: String,
    DbR: Number,
    DbG: Number,
    DbB: Number
  })

  PaintTesting =  mongoose.models.PaintQuery || mongoose.model("PaintQuery",paintSchema,"Paints")
  await PaintCollectionQuery()

  async function PaintCollectionQuery(){
    console.log("PCQ entered");
    let FoundPaint = false;

    let i = 1;
    let R = parseInt(req.RgbData.R);
    let G = parseInt(req.RgbData.G);
    let B = parseInt(req.RgbData.B);
    console.log(PaintTesting)
    do {
      const Paint = await PaintTesting
      .where("DbR").lt((R)+i).gt((R)-i)
      .where("DbG").lt((G)+i).gt((G)-i)
      .where("DbB").lt((B)+i).gt((B)-i)
      //.select("ColourName")
      if ((Paint ) && (Paint != "")){
        console.log(Paint)
        FoundPaint = true
            const PaintName = ((Paint[0]["ColourName"]));
            const PaintR = ((Paint[0]["DbR"]));
            const PaintG = ((Paint[0]["DbG"]));
            const PaintB = ((Paint[0]["DbB"]));
            let PaintRgb = [PaintR,PaintG,PaintB];
            req.PaintName = PaintName;
            req.PaintRgb = PaintRgb;
            next()
      } else {
        i += 1;
        FoundPaint = false;
      }
    }
    while (FoundPaint === false);
  }
}


//still no clue
module.exports = ResultsRouter;
