const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer");

const {
  getProfile,
  updateProfile,
  updateImage,
} = require("../controllers/user.controller");
const authToken = require("../middlewares/authenticationMiddleware");
const errorMiddleware = require("../middlewares/errorMiddleware");

router.get("/", authToken, getProfile);
router.put("/update", authToken, updateProfile);
router.put("/image", authToken, upload.single("image"), updateImage);
// router.put('/image');
router.use(errorMiddleware);

module.exports = router;
