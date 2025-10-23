import mongoose from "mongoose";

const WatchedSchema = new mongoose.Schema(
  {
    movie_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
    },
    episode: {
      type: Number,
      min: 0,
    },
    watched_at: {
      type: Date,
    },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    // tên người dùng
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    // Mật khẩu đã được mã hóa
    hashedPassword: {
      type: String,
      required: true,
    },
    //email
    email: {
      type: String,
      require: true,
      unique: true,
      trim: true,
    },
    displayName: {
      type: String,
      require: true,
      trim: true,
    },
    // ảnh thờ
    avatarUrl: {
      type: String,
    },
    // Cloudinary public_id ảnh thờ để xóa ảnh
    avatarId: {
      type: String,
    },
    // danh sách phim được đánh dấu
    bookmarked_movies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
      },
    ],
    // lịch sử xem
    watched_history: [WatchedSchema],
    // phân quyền
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true, // Ngày tạo và cập nhật
  }
);

const User = mongoose.model("User", userSchema);
export default User;
