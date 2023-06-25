import mongoose from "mongoose";
const { Schema } = mongoose;
const sessionSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    jwt: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model("Session", sessionSchema);
