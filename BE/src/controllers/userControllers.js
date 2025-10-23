import User from "../models/User.js";
import * as crud from "./crudControllers.js";
import bcrypt from "bcrypt";

// Custom createUser để xử lý upload avatar
export const createUser = async (req, res) => {
  try {
    const { username, password, email, displayName } = req.body;
    // if (!username || !password || !email || !displayName) {
    //   return res
    //     .status(400)
    //     .json({ message: "Vui lòng nhập đầy đủ thông tin" });
    // }

    //Kiểm tra xem tài khoản có tồn tại ko
    const duplicate = await User.findOne({ username });
    if (duplicate) {
      return res.status(409).json({ message: "username đã tồn tại" });
    }

    // mã hóa password
    const hashedPassword = await bcrypt.hash(password, 10); // salt = 10

    // Chuyển các dữ liệu bookmarked_movies và watched_history từ string sang array
    const parsedBookmarkedMovies = bookmarked_movies
      ? JSON.parse(bookmarked_movies)
      : [];
    const parsedWatchedHistory = watched_history
      ? JSON.parse(watched_history)
      : [];

    // Tạo user mới với thông tin nhận được
    const user = await User.create({
      username,
      hashedPassword,
      email,
      displayName,
      bookmarked_movies: parsedBookmarkedMovies,
      watched_history: parsedWatchedHistory,
      role,
      avatar_url, // Nếu có avatar thì sẽ thêm vào
    });

    // Trả về user vừa tạo
    res.status(201).json(user);
  } catch (err) {
    console.error("Create User Error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Custom updateUser để xử lý upload avatar
export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id; // Lấy ID của user cần cập nhật từ params

    const { username, password, bookmarked_movies, watched_history, role } =
      req.body;

    // Kiểm tra xem có ảnh avatar mới không
    const avatar_url = req.files?.avatar_url
      ? "/uploads/" + req.files.avatar_url[0].filename
      : undefined; // Không thay đổi nếu không có ảnh mới

    // Chuyển các dữ liệu bookmarked_movies và watched_history từ string sang array
    const parsedBookmarkedMovies = bookmarked_movies
      ? JSON.parse(bookmarked_movies)
      : [];
    const parsedWatchedHistory = watched_history
      ? JSON.parse(watched_history)
      : [];

    // Tìm user theo ID và cập nhật
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        username,
        password,
        bookmarked_movies: parsedBookmarkedMovies,
        watched_history: parsedWatchedHistory,
        role,
        ...(avatar_url && { avatar_url }), // Cập nhật avatar nếu có (sử dụng cú pháp spread operator)
      },
      { new: true } // Trả về user đã được cập nhật
    );

    // Nếu không tìm thấy user
    if (!updatedUser) {
      return res.status(404).json({ message: "User không tồn tại" });
    }

    // Trả về user đã cập nhật
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Update User Error:", err);
    res.status(500).json({ message: err.message });
  }
};

export const getAllUsers = crud.getAll(User);
export const deleteUser = crud.remove(User);
