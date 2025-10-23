import mongoose from "mongoose";

const genreSchema = new mongoose.Schema(
  {
    // tên thể loại
    name: {
      type: String,
      required: true,
      unique: true,
    },
    // Dạng URL thân thiện
    slug: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true, // Ngày tạo và cập nhật
  }
);

const Genre = mongoose.model("Genre", genreSchema);
export default Genre;
