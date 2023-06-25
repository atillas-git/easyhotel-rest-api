import mongoose from "mongoose";
const { Schema } = mongoose;
const checkInSchema = new Schema(
  {
    reservationId: {
      type: String,
      required: true,
      unique: true,
    },
    voucherNo: {
      type: Number,
    },
    checkIn: {
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
    paidAmount: Number,
    note: String,
  },
  { timestamps: true }
);
export default mongoose.model("Checkin", checkInSchema);
