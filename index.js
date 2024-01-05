const bodyParser = require("body-parser");
const express = require("express");
const dbConnect = require("./config/dbConnect");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const app = express();
const dotenv = require("dotenv").config();

const PORT = process.env.PORT;

const authRouter = require("./routes/authRoute");

const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");

dbConnect();
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/user", authRouter);
app.use("/api/saleinvoice", require("./routes/SalesInvoiceBillRoute/SalesInvoiceBillRoute"));

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(
    `GYM Server is running  at PORT ${PORT}`
  );
});