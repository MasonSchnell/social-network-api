const router = require("express").Router();

const Thought = require("../models/Thought");
const User = require("../models/User");

// Get All thoughts
router.get("/thought", async (req, res) => {
  const thought = await Thought.find();

  res.json(thought);
});

// Create thought
router.post("/thought", async (req, res) => {
  try {
    const user_id = req.session.user_id;
    console.log(req.session.user_id);
    const user = await User.findById(user_id);

    const thoughtData = {
      thoughtText: req.body.thoughtText,
      username: user.username,
    };

    const thought = await Thought.create(thoughtData);

    await User.findByIdAndUpdate(user_id, { $push: { thoughts: thought._id } });

    res.json(thought);
  } catch (err) {
    console.log("here");
    res.status(500).send({ message: err.message });
  }
});

module.exports = router;
