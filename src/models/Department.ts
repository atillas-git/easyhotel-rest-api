import mongoose from "mongoose";
const { Schema } = mongoose;
const departmentSchema = new Schema(
  {
    hotelId: {
      type: String,
      reqired: true,
    },
    name: {
      type: String,
      reqired: true,
    },
    manager: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    policies: {
      type: [mongoose.Types.ObjectId],
      default: [],
    },
  },
  { timestamps: true }
);
export default mongoose.model("Department", departmentSchema);
