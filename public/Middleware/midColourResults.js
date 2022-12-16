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
    //chaining middleware from DataPull to Call to Database. after this is concluded the page can be rendered last.
    .get(DataPull, CallToDatabase,(req,res) => {
    res.render('pages/pgColourRes',{
      //passing data to front-end EJS
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
  //online mongodb Atlas database of assorted paint data
  const url = 'mongodb+srv://dbUser:PasswordForTesting@colourpickerjs.jwzryq7.mongodb.net/ColourPickerJS?retryWrites=true&w=majority'; //specific reference to /ColourPickerJS database
  mongoose.set('strictQuery', true);
  //connection to database
  mongoose.connect(url,
    () => {
  });

  //setting schema to align with Paints Database
  const paintSchema = new mongoose.Schema({
    ColourName: String,
    DbR: Number,
    DbG: Number,
    DbB: Number
  })

  //assinging Paint testing algorithm to the schema model
  PaintTesting =  mongoose.models.PaintQuery || mongoose.model("PaintQuery",paintSchema,"Paints")
  await PaintCollectionQuery()

  //asnyc to wait until paint is found
  async function PaintCollectionQuery(){
    let FoundPaint = false;

    //single variable reused to broaden all query boundaries
    let i = 1; //not 0 so there is always a targeted value which can be greater than the lower boundary, and lesser than the top boundary
    let R = parseInt(req.RgbData.R);
    let G = parseInt(req.RgbData.G);
    let B = parseInt(req.RgbData.B);
    do {
      const Paint = await PaintTesting
      .where("DbR").lt((R)+i).gt((R)-i)
      .where("DbG").lt((G)+i).gt((G)-i)
      .where("DbB").lt((B)+i).gt((B)-i)
      if ((Paint ) && (Paint != "")){ // if paint exists and is not empty
        FoundPaint = true //end while loop
            const PaintName = ((Paint[0]["ColourName"]));//set foundpaint to passable data
            const PaintR = ((Paint[0]["DbR"]));
            const PaintG = ((Paint[0]["DbG"]));
            const PaintB = ((Paint[0]["DbB"]));
            let PaintRgb = [PaintR,PaintG,PaintB]; //create array from foundpaint data
            req.PaintName = PaintName; //pass using request objects
            req.PaintRgb = PaintRgb;
            next()
      } else {
        //increment all boundaries by 1
        i += 1;
        //re-affirm loop status
        FoundPaint = false;
      }
    }
    while (FoundPaint === false);
  }
}


module.exports = ResultsRouter;
