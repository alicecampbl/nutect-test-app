const multer = require("multer");
const InvariantError = require("../exceptions/InvariantError");

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
      cb(null, true);
    } else {
      cb(new InvariantError("Format image tidak sesuai!", 102), false);
    }
  },
});

module.exports = upload;
