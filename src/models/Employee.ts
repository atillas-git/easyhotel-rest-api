import mongoose from "mongoose";
const { Schema } = mongoose;
const employeeSchema = new Schema(
  {
    hotelId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    departmentId: {
      type: mongoose.Types.ObjectId,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
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
    isRoot: {
      type: Boolean,
      default: false,
    },
    policies: {
      type: [mongoose.Types.ObjectId],
      default: [],
    },
  },
  { timestamps: true }
);
export default mongoose.model("Employee", employeeSchema);
