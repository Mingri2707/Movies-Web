import mongoose from "mongoose";

const replySchema = new mongoose.Schema(
  {
    // id người dùng
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const commentSchema = new mongoose.Schema(
  {
    // id của phim
    movie_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
    },
    // id người dùng
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    // nội dung
    content: {
      type: String,
    },
    // lượt thích
    likes: {
      type: Number,
      default: 0,
    },
    // phản hồi
    replies: [replySchema],
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
