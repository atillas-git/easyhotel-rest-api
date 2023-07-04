import mongoose from "mongoose";
const { Schema } = mongoose;

const policySchema = new Schema(
  {
    name: {
      type: String,
      reqired: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Policy", policySchema);
