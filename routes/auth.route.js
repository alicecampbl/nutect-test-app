const express = require("express");
const router = express.Router();

const {
  userRegistration,
  userLogin,
} = require("../controllers/user.controller");
const {
  registerBodyValidation,
  loginBodyValidation,
} = require("../middlewares/validationMiddleware");
const errorMiddleware = require("../middlewares/errorMiddleware");

router.post("/registration", registerBodyValidation, userRegistration);
router.post("/login", loginBodyValidation, userLogin);

// handling on middleware
router.use(errorMiddleware);

module.exports = router;
