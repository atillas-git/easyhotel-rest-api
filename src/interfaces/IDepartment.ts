import { IBase } from "./IBase";
export interface IDepartment extends IBase {
  _id?: string;
  hotelId: string;
  name: string;
  manager: string;
  desc: string;
  policies: string[];
  createdAt?: NativeDate;
  updatedAt?: NativeDate;
}
