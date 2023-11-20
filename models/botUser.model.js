const mongoose = require("mongoose");
const botUsersSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    isSubscribed: {
      type: Boolean,
      required: true,
      default: true,
    },
    isBlocked: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Botusers = mongoose.model("Botusers", botUsersSchema);
module.exports = Botusers;
