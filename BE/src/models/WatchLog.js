import mongoose from "mongoose";

// tương tác của người dùng

const watchLogSchema = new mongoose.Schema(
  {
    // id người dùng thực hiện hành động
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    // id phim
    movie_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
    },
    // số tập (nếu có)
    episode: {
      type: Number,
    },
    // hành động: play, pause, finish
    action: {
      type: String,
      enum: ["play", "pause", "finish"],
    },
    // thời điểm thực hiện hành động
    timestamp: {
      type: Date,
      default: Date.now,
    },
    // thiết bị sử dụng
    device: {
      type: String,
    },
    // địa chỉ IP của người dùng
    ip: {
      type: String,
    },
  },
  {
    timestamps: false, // Không cần createdAt/updatedAt vì đã có `timestamp`
  }
);

const WatchLog = mongoose.model("WatchLog", watchLogSchema);
export default WatchLog;
