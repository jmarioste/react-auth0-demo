const express = require("express");
require("dotenv").config();
const jwt = require("express-jwt"); //validate JWT and set req.user
const jwksRsa = require("jwks-rsa"); //retrieves RSA keys from a JSON web key set (JWKS) enpoint
const checkSope = require("express-jwt-authz");

var jwtCheck = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),
  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  issuer: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/`, //sra-auth0-jmarioste-dev.jp.auth0.com
  algorithms: ["RS256"],
});

const app = express();
app.get("/public", (req, res) => {
  res.json({
    message: "Hello from public APi!",
  });
});

app.get("/private", jwtCheck, (req, res) => {
  res.json({
    message: "Hello from private API!",
  });
});

app.get("/courses", jwtCheck, checkSope(["read:course"]), (req, res) => {
  res.json({
    courses: [
      { id: 1, title: "Building apps with react and redux" },
      { id: 2, title: "React fundamentals" },
    ],
  });
});

app.listen(3001);
console.log("API server listening on " + process.env.REACT_APP_AUTH0_API);
