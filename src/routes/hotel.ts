import express, { Request, Response, NextFunction, Router } from "express";
const router: Router = express.Router();
router.post(
  "/saveHotel",
  async (req: Request, res: Response, next: NextFunction) => {}
);
export default router;
