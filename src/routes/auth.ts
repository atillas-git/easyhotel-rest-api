import express, { Request, Response, NextFunction, Router } from "express";
import bcrypt from "bcrypt";
import { IEmployee } from "../interfaces/IEmployee";
import Employee from "../models/Employee";

const router: Router = express.Router();

router.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employee2Register = { ...req.body } as IEmployee;
      if (!employee2Register.email || !employee2Register.password) {
        return res.status(400).json("Please provide the necessary fields !");
      }
      const employee = await Employee.findOne({
        email: employee2Register.email,
      });
      if (employee) {
        return res.status(400).json("Employee already exists ! Please login.");
      }

      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(employee2Register.password, salt);

      const doc = new Employee({ ...employee2Register, password: password });
      await doc.save();
      return res.status(200).json("Success !");
    } catch (error) {
      next(error);
    }
  }
);

export default router;
