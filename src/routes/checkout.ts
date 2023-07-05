import mongoose from "mongoose";
import express, { Request, Response, NextFunction } from "express";
import CheckIn from "../models/CheckIn";
import Reservation from "../models/Reservation";
import { ICheckOut } from "../interfaces/ICheckOut";
import { searchQuery } from "../utils/searchQuery";
import { authorize } from "../middlewares/authorize";
import CheckOut from "../models/CheckOut";

const router = express.Router();

router.use(authorize);

router.get(
  "/getCheckOut/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const checkOutId = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(checkOutId)) {
        return res.status(400).json("Invalid checkin Id !");
      }
      const doc = await CheckOut.findById(checkOutId);
      if (!doc) {
        return res.status(404).json("Not Found !");
      }
      return res.status(200).json(doc);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/searchCheckOut",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const checkOut = req.body as ICheckOut;
      let queryArray = searchQuery<ICheckOut>(checkOut);
      const ref = CheckOut.find().or(queryArray);
      if (checkOut.firstResult) {
        ref.skip(checkOut.firstResult);
      }
      if (checkOut.maxResult) {
        ref.limit(checkOut.maxResult);
      }
      const docs = await ref;
      return res.status(200).json(docs);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/saveCheckOut",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const checkOut = req.body as Omit<
        ICheckOut,
        "firstResult" | "maxResult" | "sort"
      >;
      if (!mongoose.Types.ObjectId.isValid(checkOut.reservationId)) {
        return res.status(400).json("Invalid reservationId !");
      }
      if (!mongoose.Types.ObjectId.isValid(checkOut.checkInId)) {
        return res.status(400).json("Invalid checkInId !");
      }
      await new CheckOut(checkOut).save();
      return res.status(200).json("Saved Successfully !");
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/updateCheckOut",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const checkOut = req.body as Omit<
        ICheckOut,
        "firstResult" | "maxResult" | "sort" | "reservationId" | "checkInId"
      >;
      if (!checkOut._id) {
        return res.status(400).json("Id is required!");
      }
      await CheckOut.findByIdAndUpdate(checkOut._id, checkOut);
      return res.status(200).json("Updated Successfully!");
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/deleteCheckOut/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const checkOutId = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(checkOutId)) {
        return res.status(400).json("Invalid checkin Id !");
      }
      await CheckIn.findByIdAndDelete(checkOutId);
      return res.status(200).json("Deleted successfully !");
    } catch (error) {
      next(error);
    }
  }
);
