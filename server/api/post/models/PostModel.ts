import mongoose, { ObjectId } from "mongoose";

const Schema = mongoose.Schema;

export interface Post {
  authorId: ObjectId;
  message: string;
  createdAt: Date;
  modifiedAt: Date | null;
}

const postSchema = new Schema({
  authorId: { type: Schema.Types.ObjectId, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  modifiedAt: { type: Date, default: null },
});

const PostModel = mongoose.model<Post>("Post", postSchema);

postSchema.pre("save", function (next) {
  if (this.isNew) {
    this.createdAt = new Date();
  } else {
    this.modifiedAt = new Date();
  }

  next();
});

export default PostModel;
