const router = require("express").Router();
const {
  getBotUsers,
  blockUser,
  deleteUser,
} = require("../controller/botUsers.controller");

router.route("/").get(getBotUsers).put(blockUser).delete(deleteUser);

module.exports = router;
