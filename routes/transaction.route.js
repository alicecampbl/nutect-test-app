const express = require("express");
const router = express.Router();

const {
  topupBalance,
  transaction,
  getAllTransaction,
} = require("../controllers/transaction.controller");
const { topupBodyValidation } = require("../middlewares/validationMiddleware");
const authenticateToken = require("../middlewares/authenticationMiddleware");
const errorMiddleware = require("../middlewares/errorMiddleware");

router.post("/topup", topupBodyValidation, authenticateToken, topupBalance);
router.post("/transaction", authenticateToken, transaction);
router.get("/transaction/history", authenticateToken, getAllTransaction);
router.use(errorMiddleware);

module.exports = router;
