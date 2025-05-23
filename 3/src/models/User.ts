import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, "用户名是必需的"],
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "密码是必需的"],
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<IUser>("User", userSchema);
