// used to render the RGB Input page EJS.

const express = require('express');
//instance of a router function to route to results
const RgbInputRouter = express.Router();

  //rendering the pgRgbInput.ejs page with local variables
  RgbInputRouter.route("/")
    .get((req,res) => {
    res.render('pages/pgRgbInput',{
      //change the title to appropriate name
      title: "RGB Input"
  });
});

//still no clue
module.exports = RgbInputRouter;
