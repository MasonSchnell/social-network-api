const express = require("express");
const session = require("express-session");

const app = express();

const api_routes = require("./controllers");

const PORT = process.env.PORT || 3333;

// Load environment variables
require("dotenv").config();

// Import db connection
const db = require("./config/connection");

// Allow json to be sent by client
app.use(express.json());

// Initialize Session Middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    // cookie: {
    //   // Cause the cookie to expire in 3 minutes
    //   maxAge: 3 * 60 * 1000,
    //   // Do not allow cookies to be accessed through client side JS
    //   httpOnly: true,
    // },
  })
);

// Load our routes - localhost:3333/api/shops
app.use("/", api_routes);

// 404 Catch All for any unknown routes
app.get("*", (req, res) => {
  res.status(404).send({
    message: "That route is incorrect",
    error: 404,
  });
});

db.on("open", () => {
  console.log("db connected");
  // Start the server
  app.listen(PORT, () => console.log("Server started on %s", PORT));
});
