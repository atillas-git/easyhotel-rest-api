import { IReservation } from "../interfaces/IReservation";

import {
  deleteReservationById,
  findReservationByIdAndUpdate,
  saveReservation,
} from "../services/ReservationService";

import express, { Request, Response, NextFunction, Router } from "express";

const router: Router = express.Router();

router.post(
  "/saveReservation",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reservation2Saved = { ...req.body } as IReservation;
      const data = await saveReservation(reservation2Saved);
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/updateReservation",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reservation2Update = { ...req.body } as IReservation;
      if (!reservation2Update._id) {
        return res.status(400).json("Reservation Id is required !");
      }
      await findReservationByIdAndUpdate(
        reservation2Update._id ?? "",
        reservation2Update
      );
      return res.status(200).json("SucessFully Updated !");
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/deleteReservation",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { reservationId } = req.body;
      const data = await deleteReservationById(reservationId);
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
