import mongoose from "mongoose";
const { Schema } = mongoose;
const guestSchema = new Schema(
  {
    hotelNo: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    telNo: {
      type: String,
      required: true,
    },
    sex: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model("Guest", guestSchema);
