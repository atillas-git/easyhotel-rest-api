import express, { NextFunction, Request, Response, Router } from "express";
import Employee from "../models/Employee";
import { IEmployee } from "../interfaces/IEmployee";
import mongoose from "mongoose";
import { IDepartment } from "../interfaces/IDepartment";
import Department from "../models/Department";

const router: Router = express.Router();

router.post(
  "/employee",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employee2save = req.body as Omit<
        IEmployee,
        "firstResult" | "maxResult" | "sort"
      >;
      const doc = new Employee(employee2save);
      await doc.save();
      return res.status(200).json("Success!");
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/employee/:employeeId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employeeId: string = req.params.employeeId;
      if (mongoose.Types.ObjectId.isValid(employeeId)) {
        return res.status(400).json("Invalid employeeId !");
      }
      const employee = await Employee.findById(employeeId);
      if (!employee) {
        return res.status(404).json("Employee not found!");
      }
      return res.status(200).json(employee);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/employee/:employeeId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employeeId: string = req.params.employeeId;
      if (mongoose.Types.ObjectId.isValid(employeeId)) {
        return res.status(400).json("Invalid employeeId !");
      }
      const employee2Update = req.body as Omit<
        IEmployee,
        "firstResult" | "maxResult" | "sort"
      >;
      await Employee.findByIdAndUpdate(employeeId, employee2Update);
      return res.status(200).json("Success!");
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/employee/:employeeId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employeeId: string = req.params.employeeId;
      if (!mongoose.Types.ObjectId.isValid(employeeId)) {
        return res.status(400).json("Object id is not valid !");
      }
      await Employee.findByIdAndDelete(employeeId);
      return res.status(200).json("Success!");
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/employee/search",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { firstResult, maxResult, sort, ...employee } =
        req.body as IEmployee;
      let queryArray: Partial<IEmployee>[] = [];
      Object.keys(employee).forEach((key: string) => {
        queryArray.push({
          [key]:
            employee[
              key as keyof Omit<IEmployee, "firstResult" | "maxResult" | "sort">
            ],
        });
      });
      const ref = Employee.find().or(queryArray);
      if (firstResult) {
        ref.skip(firstResult);
      }
      if (maxResult) {
        ref.limit(maxResult);
      }
      const docs = await ref;
      return res.status(200).json(docs);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/department",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deparment2Save = req.body as Omit<
        IDepartment,
        "firstResult" | "maxResult" | "sort"
      >;
      const department = await Department.findOne({
        hotelId: deparment2Save.hotelId,
        name: deparment2Save.name,
      });
      if (department) {
        return res.status(400).json("Department already exists!");
      }
      const newD = new Department(deparment2Save);
      await newD.save();
      return res.status(200).json("Success!");
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/deparment/:departmentId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const departmentId = req.params.departmentId;
      if (mongoose.Types.ObjectId.isValid(departmentId)) {
        return res.status(400).json("Invalid departmentId!");
      }
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/department:/departmentId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  }
);

export default router;
