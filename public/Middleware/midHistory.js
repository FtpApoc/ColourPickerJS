//used to render the History page EJS.

const express = require('express');
//instance of a router function to route to results
const HistoryRouter = express.Router();

  //rendering the History.ejs page with local variables
  HistoryRouter.route("/")
      .get((req,res) => {
        res.render('pages/pgHistory',{
          title: "History"
        });
});

module.exports = HistoryRouter;
