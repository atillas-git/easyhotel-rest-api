import mongoose from "mongoose";
const { Schema } = mongoose;
const agencySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    telNo: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
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
export default mongoose.model("Agency", agencySchema);
