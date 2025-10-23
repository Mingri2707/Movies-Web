import mongoose from "mongoose";
const characterSchema = new mongoose.Schema({
  // tên nhân vật/diễn viên
  name: {
    type: String,
    required: true,
    trim: true,
  },
  // ảnh nhân vật/diễn viên
  image: {
    type: String,
    default: "",
    trim: true,
  },
});

const movieSchema = new mongoose.Schema(
  {
    // Tên phim
    title: {
      type: String,
      required: true,
      trim: true,
      index: true, // tạo index để tìm kiếm nhanh theo title
      unique: true,
    },
    // Dạng URL-friendly, ví dụ: attack on titan
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    // Mô tả phim
    description: {
      type: String,
      default: "",
      trim: true,
    },
    // Ngày phát hành
    releaseDate: {
      type: Date,
      index: true,
    },
    // Thể loại
    genres: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Genre",
        required: true,
      },
    ],
    // Quốc gia sản xuất
    country: {
      type: String,
      required: true,
      index: true,
    },
    // Thời lượng (tính theo phút)
    duration: {
      type: Number,
      required: true,
      min: 1, // thời lượng phải lớn hơn 0
    },
    // ảnh bìa
    thumbnail: {
      type: String,
      required: true,
      trim: true,
    },
    // ảnh khung
    poster: {
      type: String,
      required: true,
      trim: true,
    },
    // Lượt đánh giá
    rating: {
      type: Number,
      default: 0,
    },
    // Tổng lượt xem
    views: {
      type: Number,
      default: 0,
    },
    // Tập phim
    episodes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Episode",
      },
    ],
    // Nhân vật/Diễn viên
    characters: {
      type: [characterSchema],
      default: [],
    },
    // Trạng thái
    status: {
      type: String,
      enum: ["Upcoming", "Ongoing", "Completed", "Dropped"],
      default: "Ongoing",
      index: true, // hỗ trợ lọc theo trạng thái
    },
    //Studio sản xuất
    studio: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true, // Ngày tạo và cập nhật
  }
);

// Tạo index kết hợp cho tìm kiếm đa điều kiện
movieSchema.index({ title: 1, status: 1, country: 1 });
movieSchema.index({ releaseDate: -1 });

const Movie = mongoose.model("Movie", movieSchema);
export default Movie;
