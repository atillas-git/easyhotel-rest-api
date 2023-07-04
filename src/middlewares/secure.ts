import { Request, Response, NextFunction } from "express";
import { CustomRequest } from "./authorize";
import { IEmployee } from "../interfaces/IEmployee";
/**
 * @author Atilla Sina Postacı
 * @param policies Union type that user needs in order to access to specific backend enpoints.
 * Can either be a array of strings or just a string.
 * Default behavior is 'or' that means if user has one of the policies in the defines array, in that case it can access the enpoint.
 * The reason why this is the case is because we might have different policies that access to the same resources in some parts of our app.
 * If you want the behavior change, you can change it by supplying the operator to "and".
 * @returns Passes the logic to the next middleware in the chain or returns an unauthorized response.
 */
export const secure = (policies:string [] | string,operator:"and" | "or" = "or")=>{
    return async (req:Request,res:Response,next:NextFunction)=>{
        try {
            const employee = (req as CustomRequest).user as IEmployee;
            if(!employee.policies || !(employee.policies.length === 0)){
                return res.status(403).json("You are not authorized to view this resource")
            }
            if(typeof policies === "string" && !employee.policies.includes(policies)){
                return res.status(403).json("You are not authorized to view this resource")
            }
            else{
                if(operator === "and" && !(employee.policies.filter((policy:string)=>policies.includes(policy)).length === policies.length)){
                    return res.status(403).json("You are not authorized to view this resource")
                }
                else{
                    if(employee.policies.filter((policy:string)=>policies.includes(policy)).length === 0){
                        return res.status(403).json("You are not authorized to view this resource")
                    }
                }
            }
            return next()
        } catch (error) {
            next(error)
        }
    }
}