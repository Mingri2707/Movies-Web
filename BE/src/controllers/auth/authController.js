import bcrypt from "bcrypt";
import User from "/WebAnime/BE/src/models/User.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import Session from "../../models/Session.js";
const ACCESS_TOKEN_TTL = "30s";
const REFRESH_TOKEN_TTL = 14 * 24 * 60 * 60 * 1000;
export const signUp = async (req, res) => {
  try {
    const { username, password, email, firstName, lastName } = req.body;
    if (!username || !password || !email || !firstName || !lastName) {
      return res
        .status(400)
        .json({ message: "Vui lòng nhập đầy đủ thông tin" });
    }

    //Kiểm tra xem tài khoản có tồn tại ko
    const duplicate = await User.findOne({ username });
    if (duplicate) {
      return res.status(409).json({ message: "username đã tồn tại" });
    }

    // mã hóa password
    const hashedPassword = await bcrypt.hash(password, 10); // salt = 10

    // tạo user mới
    await User.create({
      username,
      hashedPassword,
      email,
      displayName: `${lastName} ${firstName}`,
    });

    // return
    return res.sendStatus(204);
  } catch (error) {
    console.error("Lỗi khi gọi signUp", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const signIn = async (req, res) => {
  try {
    // lấy input từ req
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Thiếu user hoặc password" });
    }

    // lấy hashPassword trong db để so với password input
    const user = await User.findOne({ username });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Username hoặc Password không chính xác" });
    }
    // kiểm tra password
    const passwordCorrect = await bcrypt.compare(password, user.hashedPassword);
    if (!passwordCorrect) {
      return res
        .status(401)
        .json({ message: "Username hoặc Password không chính xác" });
    }
    // nếu khớp, tạo accessToken với JWT
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_TTL }
    );
    // tạo refresh token
    const refreshToken = crypto.randomBytes(64).toString("hex");
    // tạo session mới để lưu refresh token
    await Session.create({
      userId: user._id,
      refreshToken,
      expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL),
    });
    // trả refresh token về trong cookies
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: REFRESH_TOKEN_TTL,
    });
    // trả access token về trong res
    return res
      .status(200)
      .json({ message: `User ${user.displayName} đã đăng nhập`, accessToken });
  } catch (error) {
    console.error("Lỗi khi gọi signIn", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const signOut = async (req, res) => {
  try {
    // lấy refreshToken từ cookie
    const token = req.cookies?.refreshToken;

    if (token) {
      // xóa refreshToken trong Session
      await Session.deleteOne({ refreshToken: token });
      // xóa cookie
      res.clearCookie("refreshToken");
    }
    return res.sendStatus(204);
  } catch (error) {
    console.error("Lỗi khi gọi signOut", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
// tạo access token mới từ refresh token
export const refreshToken = async (req, res) => {
  try {
    // lấy refreshToken từ cookie
    const token = req.cookies?.refreshToken;
    if (!token) {
      return res.status(401).json({ message: "Token không tồn tại" });
    }
    // so sánh refreshToken trong db
    const session = await Session.findOne({ refreshToken: token });
    if (!session) {
      return res.status(403).json({ message: "Token không hợp lệ" });
    }
    // kiểm tra token đã hết hạn chưa
    if (session.expiresAt < new Date()) {
      // xóa session
      await Session.deleteOne({ _id: session._id });
      return res.status(401).json({ message: "Token đã hết hạn" });
    }
    // tạo access token mới
    const accessToken = jwt.sign(
      { userId: session.userId._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_TTL }
    );
    // trả access token về
    return res.status(200).json({ accessToken });
  } catch (error) {
    console.error("Lỗi khi gọi refreshToken", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const test = async (req, res) => {
  return res.sendStatus(204);
};
