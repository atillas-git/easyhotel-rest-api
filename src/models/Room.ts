import mongoose from "mongoose";
const { Schema } = mongoose;

const roomSchema = new Schema(
  {
    roomNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
    },
    floorNumber: {
      type: Number,
    },
    status: {
      type: String,
      default: "CLEAN",
    },
    occupied: {
      type: Boolean,
      default: false,
    },
    roomType: {
      type: String,
      required: true,
    },
    bedType: {
      type: String,
    },
    note: String,
  },
  { timestamps: true }
);

export default mongoose.model("Room", roomSchema);
