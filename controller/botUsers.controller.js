const Botusers = require("../models/botUser.model");

exports.getBotUsers = async (req, res) => {
  try {
    const botUsers = await Botusers.find({});
    return res.status(200).json(botUsers);
  } catch (error) {
    return res.status(500).json("Internal server error");
  }
};

exports.blockUser = async (req, res) => {
  try {
    console.log(req.body);
    const newUpdatedUser = await Botusers.updateOne(
      { _id: req.query.id },
      {
        $set: {
          isBlocked: req.body.flag,
        },
      }
    );
    if (newUpdatedUser) {
      return res.status(201).json("User updated!");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};

exports.deleteUser = async (req, res) => {
  try {
    console.log(req.query);
    const deletedUser = await Botusers.deleteOne({ _id: req.query.id });
    if (deletedUser) {
      return res.status(201).json("User deleted!");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};
