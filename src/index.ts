import express, { Express } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";

import reservationRouter from "./routes/reservation";
import authRouter from "./routes/auth";

dotenv.config();

const connectionUri = process.env.MONGO_URL || "";
mongoose.connect(connectionUri).then(() => {
  console.log("Connection Success !");
});

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/reservation", reservationRouter);
app.use("/api/auth", authRouter);

app.listen(port, () => {
  console.log(`⚡️ [server]: Server is running at http://localhost:${port}`);
});
