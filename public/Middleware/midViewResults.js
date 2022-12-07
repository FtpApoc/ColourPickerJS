//This middleware is designed to call to a MongoDB database, with a query of a given RGB value, in order to return a paint name
//also used to render the Results page EJS.

const express = require('express');
//instance of a router function to route to results
const ResultsRouter = express.Router();

const RgbValue = 0

//Rendering of the page should be last so all data is available to do when loaded
  //rendering the pgColourRes.ejs page with local variables
  ResultsRouter.route("/")
    .get((req,res) => {
    res.render('pages/pgColourRes',{
      //change the title to appropriate name
      title: "Colour Results"
  });
});

//still no clue
module.exports = ResultsRouter;
