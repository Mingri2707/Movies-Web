import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    console.log("Kết nối với MongoDB thành công");
  } catch (error) {
    console.error("Lỗi khi kết nối đến MongoDB", error);
    process.exit(1); // Thoát khỏi ứng dụng nếu không thể kết nối
  }
};
