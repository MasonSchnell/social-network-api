const router = require("express").Router();

const user_routes = require("./user_routes");
const thought_routes = require("./thought_routes");

// const user_routes = require('./user_routes');

router.use("/api", [user_routes, thought_routes]);

// localhost:3333/auth
// router.use('/auth', user_routes);

module.exports = router;
