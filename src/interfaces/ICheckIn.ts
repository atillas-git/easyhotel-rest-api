import { IBase } from "./IBase";
export interface ICheckIn extends IBase {
  _id?: string;
  reservationId: string;
  desc: string;
  noOfOccupants: number;
  guests: string[];
  note?: string;
}
