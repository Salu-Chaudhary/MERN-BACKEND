import express from "express";
import productRouter from "./routers/product.route.js";
import usersRouter from "./routers/users.route.js";
import orderRouter from "./routers/order.route.js";
import authRouter from "./routers/auth.route.js";
import connectWithDB from "./config/db.js";
import config from "./config/config.js";

const app = express();
app.use(express.json());

connectWithDB();

app.use("/", productRouter);
app.use("/", usersRouter);
app.use("/orders", orderRouter);

app.use("/", authRouter);

app.get("/", (req, res) => {
  res.json({
    status: "Success",
    app: "E-COMMERCE-WEBSITE",
    version: "1.0.0",
  });
});

app.listen(config.port, () => {
  console.log(`Server is successfully running on:${config.port} port`);
});
