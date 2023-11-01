const { Schema } = require("mongoose");

const reactionSchema = new Schema({
  reactionBody: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  formattedCreatedAt: {
    type: String,
    get: function () {
      return new Date(this.createdAt).toLocaleString();
    },
  },
});

module.exports = reactionSchema;
