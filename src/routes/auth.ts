import express, { Request, Response, NextFunction, Router } from "express";
import bcrypt from "bcrypt";
import { IEmployee } from "../interfaces/IEmployee";
import Employee from "../models/Employee";
import { generateToken } from "../utils/jwt";
import { CustomRequest, authorize } from "../middlewares/authorize";

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

      const salt: string = await bcrypt.genSalt(10);
      const password: string = await bcrypt.hash(
        employee2Register.password,
        salt
      );

      const doc = new Employee({ ...employee2Register, password: password });
      await doc.save();
      return res.status(200).json("Success !");
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employee2Login = { ...req.body } as Partial<IEmployee>;
      if (!employee2Login.email || !employee2Login.password) {
        return res.status(400).json("Please provide the necessary fields !");
      }
      const employee = await Employee.findOne({ email: employee2Login.email });
      if (!employee) {
        return res.status(403).json("Invalid email or password !");
      }
      const check: boolean = await bcrypt.compare(
        employee2Login.password,
        employee.password
      );
      if (!check) {
        return res.status(403).json("Invalid email or password !");
      }
      let payload = {
        _id: employee.id,
        email: employee.email,
        name: employee.name,
        hotelId: employee.hotelId,
      };
      const token = generateToken(payload);
      return res
        .status(200)
        .json({ access_token: token, email: employee.email, id: employee.id });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/checkUserAuthentication",
  authorize,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user: any = (req as CustomRequest).user;
      if (!user) {
        return res.status(403).json("Unauthorized !");
      }
      const employee = await Employee.findById(user._id);
      if (!employee) {
        return res.status(403).json("Unauthorized !");
      }
      return res.status(200).json("Authorized !");
    } catch (error) {
      return next(error);
    }
  }
);

export default router;
