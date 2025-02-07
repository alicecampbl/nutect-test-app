require("dotenv").config();
const express = require("express");

const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 8080;

// route
const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/user.route");
const informationRouter = require("./routes/information.route");
const transactionRouter = require("./routes/transaction.route");

app.use(bodyParser.json());

app.get("/", (req, res) => {
  const { data } = req.body;
  res.send(`Express successfully running, data that passed is ${data}`);
});

app.use("/", authRoute);
app.use("/profile", userRoute);
app.use("/", informationRouter);
app.use("/", transactionRouter);

app.listen(port, () => {
  console.log(`Server running on: ${port}`);
});
