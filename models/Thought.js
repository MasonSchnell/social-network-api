const { model, Schema } = require("mongoose");
const reactionSchema = require("./Reaction");
const { format } = require("date-fns");

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280,
  },
  createdAt: {
    type: Date,
    default: new Date(format(new Date(), "MM/dd/yyyy")),
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema],
});

thoughtSchema.virtual("formattedCreatedAt").get(function () {
  return format(this.createdAt, "yyyy-MM-dd HH:mm:ss");
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
