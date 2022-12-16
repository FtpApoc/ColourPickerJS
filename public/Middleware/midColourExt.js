// used to render the Colour Extension page EJS.

const express = require('express');
//instance of a router function to route to Colour Extension
const ColourExtRouter = express.Router();

//Rendering of the page should be last so all data is available to do when loaded
  //rendering the pgColourExt.ejs page with local variables
  ColourExtRouter.route("/")
      .get((req,res) => {
        res.render('pages/pgColourExt',{
          title: "Colour Extractor"
        });
});

module.exports = ColourExtRouter;
