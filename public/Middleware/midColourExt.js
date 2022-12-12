//This middleware is designed to call to a MongoDB database, with a query of a given RGB value, in order to return a paint name
//also used to render the Results page EJS.

const express = require('express');
//instance of a router function to route to results
const ColourExtRouter = express.Router();

//Rendering of the page should be last so all data is available to do when loaded
  //rendering the pgColourRes.ejs page with local variables
  ColourExtRouter.route("/")
      .get((req,res) => {
        res.render('pages/pgColourExt',{
          title: "Colour Extractor"
        });
});

//still no clue
module.exports = ColourExtRouter;
