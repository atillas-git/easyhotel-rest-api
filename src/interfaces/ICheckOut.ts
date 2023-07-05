import { IBase } from "./IBase";
export interface ICheckOut extends IBase {
  _id?: string;
  reservationId: string;
  checkInId: string;
  desc: string;
  noOfOccupants: number;
  guests: string[];
  note?: string;
}
