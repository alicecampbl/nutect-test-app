const express = require("express");
const router = express.Router();

const {
  getAllService,
  getAllBanner,
} = require("../controllers/information.controller");
const { getBalance } = require("../controllers/user.controller");
const authenticateToken = require("../middlewares/authenticationMiddleware");
const errorMiddleware = require("../middlewares/errorMiddleware");

router.get("/banner", authenticateToken, getAllBanner);
router.get("/services", authenticateToken, getAllService);
router.get("/balance", authenticateToken, getBalance);
router.use(errorMiddleware);

module.exports = router;
