import express, { Request, Response, NextFunction } from "express";
import { authorize } from "../middlewares/authorize";
import { IEmployee } from "../interfaces/IEmployee";
import Employee from "../models/Employee";

const router = express.Router();

router.use(authorize);

router.post(
  "/searchEmployees",
  async (req: Request, res: Response, next: NextFunction) => {
    const { firstResult, maxResult, sort, ...employee } = req.body as IEmployee;
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
  }
);

router.post("/saveEmployee", async (req, res, next) => {});

router.delete("/deleteEmployee", async (req, res, next) => {});

router.put("/updateEmployee", async (req, res, next) => {});

export default router;
