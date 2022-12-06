//This middleware is designed to call to a MongoDB database, with a query of a given RGB value, in order to return a paint name
//also used to render the Results page EJS.

const express = require('express');
//instance of a router function to route to results
const RgbInputRouter = express.Router();

//Rendering of the page should be last so all data is available to do when loaded
  //rendering the pgColourRes.ejs page with local variables
  RgbInputRouter.route("/")
    .get((req,res) => {
    res.render('pages/pgRgbInput',{
      //change the title to appropriate name
      title: "RGB Input"
  });
});

//still no clue
module.exports = RgbInputRouter;
