import mongoose, { Document, Model, Schema } from "mongoose";

interface UserType extends Document {
  username: string;
  email: string;
  password?: string;
}

const userSchema = new Schema<UserType>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
  },
  {
    timestamps: true, // Optional: adds createdAt and updatedAt fields
  }
);

const User: Model<UserType> =
  mongoose.models.User || mongoose.model<UserType>("User", userSchema);

export default User;
