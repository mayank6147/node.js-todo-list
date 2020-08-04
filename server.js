// jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");



const app = express();
var items = [];
var workList = [];
app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

/* for serve static file like images , css ,sounds in express we create folder public */

app.use(express.static("public"));

app.get("/", function (req, res) {
  var today = new Date();

  var options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  var day = today.toLocaleDateString("en-US", options);
  /* for sending data to html templete*/
  res.render("list", {
    listTitles: day,
    listItems: items,
  });
});

app.post("/", function (req, res) {
  console.log(req.body);
  var item = req.body.newItem;
  if (item === "" || item === null) {
 
        res.redirect("/");
  } else {
    if (req.body.list === "work") {
      workList.push(item);
      res.redirect("/work");
    } else {
      items.push(item);
      res.redirect("/");
    }
  }
});
app.get("/work", function (req, res) {
  res.render("list", {
    listTitles: "work list",
    listItems: workList,
  });
});
app.get("/about", function (req, res) {
  res.render("about");
});
app.listen(3000, function (req, res) {
  console.log("server stared at 3000");
});
