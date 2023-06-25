import { IReservation } from "../interfaces/IReservation";
import ReservationModel from "../models/Reservation";
import { FilterQuery, UpdateQuery } from "mongoose";

export const saveReservation = async (reservation: IReservation) => {
  const doc = new ReservationModel({ ...reservation });
  return await doc.save();
};
export const findReservations = async (
  filter: FilterQuery<Partial<IReservation>>
) => {
  return await ReservationModel.find(filter);
};

export const findReservationByIdAndUpdate = async (
  reservationId: string,
  updateQuery: UpdateQuery<Partial<IReservation>>
) => {
  return await ReservationModel.findByIdAndUpdate(reservationId, updateQuery);
};

export const updateOneReservation = async (
  filter: FilterQuery<Partial<IReservation>>,
  updateQuery: any
) => {
  return await ReservationModel.updateOne(filter, updateQuery);
};

export const updateManyReservations = async (
  filter: FilterQuery<Partial<IReservation>>,
  updateQuery: any
) => {
  return await ReservationModel.updateMany(filter, updateQuery);
};

export const deleteReservationById = async (reservationId: string) => {
  return await ReservationModel.findByIdAndDelete(reservationId);
};
