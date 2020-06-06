const 
  express = require('express'),
  app = express(),
  port = process.env.PORT || 5000,
  bodyParser		= require("body-parser"),
  cookieParser	= require('cookie-parser'),
  fileUpload    = require('express-fileupload');

const 
  userRouter  = require('./server/modules/user/route');

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));
/**
 |==========================================================================
 | Middleware to handle OPTIONS request and CORS ===========================
 |==========================================================================
 */
app.use(function (req, res, next) {
  //SET COMMON HEADERS
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, content-type, Authorization, cache-control");
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Request-Headers', 'X-Requested-With, content-type, accept, origin, withcredentials');
  res.header('Access-Control-Expose-Headers', 'Pagination-Current-Page, Pagination-Page-Count, Pagination-Per-Page, Pagination-Total-Count');

  // Allow CORS in local development
  const allowedOrigins = ['http://localhost:5000', 'http://localhost:3000'];
  const origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1)
    res.setHeader('Access-Control-Allow-Origin', origin);

  //handling OPTIONS request
  if (req.method === 'OPTIONS') {
      res.sendStatus(204);
  } else {
      next();
  }
});

app.use(bodyParser.urlencoded({ extended: false }));		// req.body URL Encoded
app.use(bodyParser.json());									// req.body JSON
app.use(cookieParser());									// Cookie reader 	=> req.cookies.CookieName
app.use(fileUpload());

// create a app route
app.use('/user', userRouter);
