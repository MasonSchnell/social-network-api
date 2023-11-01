const router = require("express").Router();

const User = require("../models/User");
const Reaction = require("../models/Reaction");

const { isAuthenticated } = require("./helpers");

// Get All users
router.get("/user", async (req, res) => {
  const user = await User.find();

  res.json(user);
});

// Update a User
router.put("/user/edit", async (req, res) => {
  const { user_id, username } = req.body;

  try {
    const updated_user = await User.findByIdAndUpdate(
      user_id,
      {
        username: username,
      },
      { new: true }
    );

    res.json(updated_user);
  } catch (err) {
    console.log("HEHEH");
    res.status(500).send({ error: err.message });
  }
});

// Get One User
router.get("/user/:user_id", async (req, res) => {
  const user_id = req.params.user_id;

  const user = await User.findById(user_id)
    .populate("thoughts")
    .populate("friends");

  res.json(user);
});

// Create user
router.post("/user", async (req, res) => {
  try {
    const user = await User.create(req.body);

    console.log(user._id);
    req.session.user_id = user._id;

    res.json(user);
  } catch (err) {
    console.log("here");
    res.status(500).send({ message: err.message });
  }
});

// Delete a User
router.delete("/user/:user_id", async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const user = await User.findByIdAndDelete(user_id);

    if (!user) {
      return res.status(404).json({ error: "No user found with this ID" });
    }

    res.status(200).json({ message: "Shop deleted successfully" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Add Friend
router.post("/user/:user_id/friends/:friend_id", async (req, res) => {
  try {
    const user_id = req.params.user_id;

    const friend_id = req.params.friend_id;

    const friend = await User.findById(friend_id);

    await User.findByIdAndUpdate(user_id, { $push: { friends: friend } });

    res.json("Friend Added");
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

module.exports = router;
