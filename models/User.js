const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(val) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi.test(val);
      },
      message() {
        return "You must enter a valid email address.";
      },
    },
  },
  thoughts: [{ type: Schema.Types.ObjectId, ref: "Thought" }],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const User = model("User", userSchema);

module.exports = User;
