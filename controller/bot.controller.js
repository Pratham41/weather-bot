const Bot = require("../models/bot.model");

exports.getToken = (req, res) => {
  try {
    const token = global.btoa(process.env.GOOGLE_CLIENT_ID);
    return res.status(200).json(token);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};

exports.getSettings = async (req, res) => {
  try {
    const botSettings = await Bot.findOne({});
    return res.status(200).json(botSettings);
  } catch (error) {
    return res.status(500).json("Internal server error");
  }
};

exports.addSettings = async (req, res) => {
  try {
    const newBotSettings = await Bot.create({
      botToken: req.body.botToken,
      weatherApiKey: req.body.weatherApiKey,
    });
    return res.status(200).json(newBotSettings);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};

exports.updateSettings = async (req, res) => {
  try {
    const newBotSettings = await Bot.updateOne(
      { _id: req.body.botSettings._id },
      {
        $set: {
          botToken: req.body.botSettings.botToken,
          weatherApiKey: req.body.botSettings.weatherApiKey,
        },
      }
    );
    if (Object.keys(newBotSettings).length > 0) {
      return res.status(201).json(true);
    } else {
      return res.status(400).json(false);
    }
  } catch (error) {
    return res.status(500).json("Internal server error");
  }
};
