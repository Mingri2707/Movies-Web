import mongoose from "mongoose";

const episodeSchema = new mongoose.Schema(
  {
    // id phim
    movie_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
    // tập bao nhiêu
    episode_number: {
      type: Number,
      required: true,
    },
    // tên tập
    title: {
      type: String,
      default: "",
    },
    // đường dẫn của tập
    video_url: {
      type: String,
      required: true,
    },
    // thời lượng của tập
    duration: {
      type: Number,
      default: 0,
    },
    // tổng lượt xem của tập này
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // Ngày tạo và cập nhật
  }
);

const Episode = mongoose.model("Episode", episodeSchema);
export default Episode;
