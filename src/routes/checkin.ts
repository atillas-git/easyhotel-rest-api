import mongoose from "mongoose";
import express, { Request, Response, NextFunction } from "express";
import CheckIn from "../models/CheckIn";
import Reservation from "../models/Reservation";
import { ICheckIn } from "../interfaces/ICheckIn";
import { searchQuery } from "../utils/searchQuery";
import { authorize } from "../middlewares/authorize";
import CheckOut from "../models/CheckOut";

const router = express.Router();

router.use(authorize);

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const checkInId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(checkInId)) {
      return res.status(400).json("Invalid checkin Id !");
    }
    const doc = await CheckIn.findById(checkInId);
    if (!doc) {
      return res.status(404).json("Not Found !");
    }
    return res.status(200).json(doc);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/searchCheckIn",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const checkIn = req.body as ICheckIn;
      let queryArray = searchQuery<ICheckIn>(checkIn);
      const ref = CheckIn.find().or(queryArray);
      if (checkIn.firstResult) {
        ref.skip(checkIn.firstResult);
      }
      if (checkIn.maxResult) {
        ref.limit(checkIn.maxResult);
      }
      const docs = await ref;
      return res.status(200).json(docs);
    } catch (error) {
      next(error);
    }
  }
);

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const checkIn = req.body as Omit<
      ICheckIn,
      "firstResult" | "maxResult" | "sort"
    >;
    if (!mongoose.Types.ObjectId.isValid(checkIn.reservationId)) {
      return res.status(400).json("Invalid reservationId !");
    }
    const reservation = await Reservation.findById(checkIn.reservationId);
    if (reservation) {
      return res.status(400).json("Reservation already in use !");
    }
    await new CheckIn(checkIn).save();
    return res.status(200).json("Saved Successfully !");
  } catch (error) {
    next(error);
  }
});

router.put("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const checkIn = req.body as Omit<
      ICheckIn,
      "firstResult" | "maxResult" | "sort" | "reservationId"
    >;
    if (!checkIn._id) {
      return res.status(400).json("Id is required!");
    }
    if (!mongoose.Types.ObjectId.isValid(checkIn._id)) {
      return res.status(400).json("Invalid reservationId !");
    }
    await CheckIn.findByIdAndUpdate(checkIn._id, checkIn);
    return res.status(200).json("Updated Successfully!");
  } catch (error) {
    next(error);
  }
});

router.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const checkInId = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(checkInId)) {
        return res.status(400).json("Invalid checkin Id !");
      }
      const checkOut = await CheckOut.find({ checkInId: checkInId });
      if (!checkOut) {
        return res.status(400).json("Please checkout first !");
      }
      await CheckIn.findByIdAndDelete(checkInId);
      return res.status(200).json("Deleted successfully !");
    } catch (error) {
      next(error);
    }
  }
);

export default router;
