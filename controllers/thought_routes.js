const router = require("express").Router();

const Thought = require("../models/Thought");
const User = require("../models/User");
const { format } = require("date-fns");

const { isAuthenticated, isLoggedIn } = require("./helpers");

// Get All thoughts
router.get("/thought", async (req, res) => {
  const thought = await Thought.find();

  res.json(thought);
});

// Update a thought
router.put("/thought/edit", async (req, res) => {
  const { thought_id, thoughtText } = req.body;

  try {
    const updated_thought = await Thought.findByIdAndUpdate(
      thought_id,
      {
        thoughtText: thoughtText,
      },
      { new: true }
    );

    res.json(updated_thought);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Get One thought
router.get("/thought/:thought_id", async (req, res) => {
  const thought_id = req.params.thought_id;

  const user = await Thought.findById(thought_id);

  res.json(user);
});

// Add Reaction
router.post("/thoughts/:thought_id/reactions", async (req, res) => {
  try {
    const thought_id = req.params.thought_id;
    const user_id = req.session.user_id;

    const user = await User.findById(user_id);

    const reaction = {
      reactionBody: req.body.reactionBody,
      username: user.username,
    };

    await Thought.findByIdAndUpdate(thought_id, {
      $push: { reactions: reaction },
    });

    res.json("Reaction Added");
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// Remove Reaction
router.delete("/thoughts/:thought_id/reactions", async (req, res) => {
  try {
    const thought_id = req.params.thought_id;
    const reaction_id = req.body.reaction_id;

    await Thought.findByIdAndUpdate(thought_id, {
      $pull: { reactions: { _id: reaction_id } },
    });

    res.json("Reaction Removed");
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
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
    const date = thought.formattedCreatedAt;
    const formDate = new Date(date);
    thought.createdAt = formDate;
    await thought.save();

    await User.findByIdAndUpdate(user_id, { $push: { thoughts: thought._id } });

    res.json(thought);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// Delete a Thought
router.delete("/thought/:thought_id", async (req, res) => {
  try {
    const thought_id = req.params.thought_id;

    const thought = await Thought.findByIdAndDelete(thought_id);

    if (!thought) {
      return res.status(404).json({ error: "No thought found with this ID" });
    }

    res.status(200).json({ message: "Thought deleted successfully" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
