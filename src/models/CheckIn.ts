import mongoose from "mongoose";
const { Schema } = mongoose;
const checkInSchema = new Schema(
  {
    reservationId: {
      type: mongoose.Types.ObjectId,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
    },
    noOfOccupants: {
      type: Number,
      default: 1,
      required: true,
    },
    guests: {
      type: Array,
      default: [],
      required: true,
    },
    note: String,
  },
  { timestamps: true }
);
export default mongoose.model("Checkin", checkInSchema);
