import express, { Request, Response, NextFunction, Router } from "express";
import { authorize } from "../middlewares/authorize";
import { IHotel } from "../interfaces/IHotel";
import Hotel from "../models/Hotel";

const router: Router = express.Router();

router.use(authorize);

router.post(
  "/saveHotel",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const hotel2Save = { ...req.body } as IHotel;
      const hotel = await new Hotel(hotel2Save).save();
      return res.status(200).json(hotel);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
