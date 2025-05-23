import mongoose, { Schema, Document, Types } from "mongoose";
interface IPost extends Document {
  title: string;
  content: string;
  author: Types.ObjectId; // 作者id
  status: "draft" | "published";
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const postSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: [true, "标题是必需的"],
    },
    content: {
      type: String,
      required: [true, "内容是必需的"],
    },
    author: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "作者是必需的"],
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  { timestamps: true }
);

export const Post = mongoose.model<IPost>("Post", postSchema);
