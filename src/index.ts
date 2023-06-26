import express, { Express } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";

import reservationRouter from "./routes/reservation";
import authRouter from "./routes/auth";
import hotelRouter from "./routes/hotel";

dotenv.config();

const connectionUri = process.env.MONGO_URL || "";
mongoose.connect(connectionUri).then(() => {
  console.log("Connection Success !");
});

const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", authRouter);
app.use("/api/reservation", reservationRouter);
app.use("/api/hotel", hotelRouter);

app.listen(port, () => {
  console.log(`⚡️ [server]: Server is running at http://localhost:${port}`);
});
