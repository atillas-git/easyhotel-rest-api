export interface IReservation {
  _id?: string;
  hotelId: string;
  voucherNo?: number;
  checkIn: Date;
  checkOut: Date;
  noOfRooms: number;
  roomNumber: number;
  agencyId?: string;
  desc?: string;
  paymentType: string;
  noOfOccupants: number;
  noOfKids: number;
  guests?: string[];
  paidAmount?: number;
  note?: string;
  createdAt?: NativeDate;
  updatedAt?: NativeDate;
}
