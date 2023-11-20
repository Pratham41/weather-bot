const mongoose = require("mongoose");
const botSchema = mongoose.Schema(
  {
    botToken: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    weatherApiKey: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Bot = mongoose.model("Bot", botSchema);
module.exports = Bot;
