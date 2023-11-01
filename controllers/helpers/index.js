async function isLoggedIn(req, res, next) {
  const user_id = req.session.user_id;
  if (user_id) {
    const user = await User.findById(user_id);
    const username = req.body.username;

    console.log("inside");
    if (user.username !== username) return next();
    console.log("otherside");
    return res.json(user);
  } else {
    return res.json({ message: "You must be logged in to post a thought." });
  }

  next();
}

function isAuthenticated(req, res, next) {
  const user_id = req.session.user_id;

  if (!user_id)
    return res.status(401).send({
      message: "Not Authorized",
    });

  next();
}

async function authenticate(req, res, next) {
  const user = await User.findById(req.session.user_id);

  req.user = user;

  next();
}

module.exports = { isAuthenticated, authenticate, isLoggedIn };
