import express, { Request, Response, NextFunction } from "express";
import { authorize } from "../middlewares/authorize";
import { IEmployee } from "../interfaces/IEmployee";
import Employee from "../models/Employee";
import mongoose from "mongoose";

const router = express.Router();

router.use(authorize);

router.post(
  "/searchEmployees",
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

router.post("/saveEmployee", async (req, res, next) => {
  try {
    const employee2save = { ...req.body } as Omit<
      IEmployee,
      "firstResult" | "maxResult" | "sort" | "policies"
    >;
    const doc = new Employee(employee2save);
    await doc.save();
  } catch (error) {
    next(error);
  }
});

router.delete(
  "/deleteEmployee/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employeeId: string = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(employeeId)) {
        return res.status(400).json("Object id is not valid !");
      }
      await Employee.findByIdAndDelete(employeeId);
    } catch (error) {
      next(error);
    }
  }
);

router.put("/updateEmployee", async (req, res, next) => {
  try {
    const employee2Update = { ...req.body } as Omit<
      IEmployee,
      "firstResult" | "maxResult" | "sort" | "policies"
    >;
    if (!employee2Update._id) {
      return res.status(400).json("Reservation Id is required !");
    }
    await Employee.findByIdAndUpdate(employee2Update._id, employee2Update);
    return res.status(200).json("SucessFully Updated !");
  } catch (error) {
    next(error);
  }
});

export default router;
