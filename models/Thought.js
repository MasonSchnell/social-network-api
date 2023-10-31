const { model, Schema } = require("mongoose");

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  username: {
    type: String,
    required: true,
  },
  formattedCreatedAt: {
    type: String,
    get: function () {
      return new Date(this.createdAt).toLocaleString();
    },
  },
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
