import mongoose from "mongoose";
const { Schema } = mongoose;
const departmentSchema = new Schema(
  {
    name: {
      type: String,
      reqired: true,
      unique: true,
    },
    manager: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model("Department", departmentSchema);
