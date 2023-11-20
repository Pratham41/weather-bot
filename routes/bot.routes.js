const router = require("express").Router();
const {
  getToken,
  getSettings,
  addSettings,
  updateSettings,
} = require("../controller/bot.controller");

router.route("/auth").get(getToken);
router.route("/").get(getSettings).post(addSettings).put(updateSettings);

module.exports = router;
