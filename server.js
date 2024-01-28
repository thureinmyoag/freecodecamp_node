/******************************************************
 * PLEASE DO NOT EDIT THIS FILE
 * the verification process may break
 * ***************************************************/

const bGround = require('fcc-express-bground');
const myApp = require('./myApp');
const express = require('express');
const app = express();


app.get("/now", function (req, res, next) {
  req.time = new Date().toString();  // Hypothetical synchronous operation
  next();
}, function (req, res) {
  res.send({ time: req.time })
});

// app.get("/:param1/:prarm2", (req, res) => {
//   var { praram1, param2 } = req.params;
//   res.json(req.params)
// });

app.get("/:word/echo", (req, res) => {
  var { word } = req.params;
  res.json({
    echo1: word
  });
  console.log(`echo: ${word}`);
});


app.use("/", function middleware(req, res, next) {
  console.log(`${req.method} ${req.path} -${req.ip}`);
  next();
});

app.get("/", function (req, res) {

  res.sendFile(__dirname + "/views/index.html")
});

/*app.get("/json", function (req, res) {
  //process.env.MESSAGE_STYLE;
  if (process.env.MESSAGE_STYLE = "uppercase") {
    res = "Hello World".toUpperCase();
  } else {
    res = "Hello World";
  }
  //res.json({ "message": "Hello json" })
})*/

app.use("/public", express.static(__dirname + "/public"))


app.get("/public/example", (req, res) => {
  res.send("Hello from /public/example route!");
});
/*if (process.env.Var_Name = "allcaps") {
  response = "Hello World".toUpperCase();
} else {
  response = "Hello World";
}*/

if (!process.env.DISABLE_XORIGIN) {
  app.use((req, res, next) => {
    const allowedOrigins = ['https://narrow-plane.gomix.me', 'https://www.freecodecamp.com'];
    const origin = req.headers.origin || '*';
    if (!process.env.XORIG_RESTRICT || allowedOrigins.indexOf(origin) > -1) {
      console.log(origin);
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    }
    next();
  });
}

const port = process.env.PORT || 3000;
bGround.setupBackgroundApp(app, myApp, __dirname).listen(port, () => {
  bGround.log(`Node is listening on port ${port}...`);
});

/******************************************************
 * PLEASE DO NOT EDIT THIS FILE
 * the verification process may break
 * ***************************************************/

