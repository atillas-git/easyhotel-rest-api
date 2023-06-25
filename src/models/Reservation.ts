import mongoose from "mongoose";
const { Schema } = mongoose;

const reservationSchema = new Schema(
  {
    hotelId: {
      type: String,
      required: true,
    },
    voucherNo: {
      type: Number,
    },
    checkIn: {
      type: Date,
      required: true,
    },
    checkOut: {
      type: Date,
      required: true,
    },
    noOfRooms: {
      type: Number,
      default: 1,
      required: true,
    },
    roomNumber: {
      type: String,
    },
    agencyId: {
      type: String,
    },
    desc: {
      type: String,
    },
    paymentType: {
      type: String,
      required: true,
    },
    noOfOccupants: {
      type: Number,
      default: 1,
      required: true,
    },
    noOfKids: {
      type: Number,
      default: 0,
      required: true,
    },
    guests: {
      type: Array,
      default: [],
      required: true,
    },
    discountRate: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
    },
    paidAmount: Number,
    note: String,
  },
  { timestamps: true }
);

export default mongoose.model("Reservation", reservationSchema);
