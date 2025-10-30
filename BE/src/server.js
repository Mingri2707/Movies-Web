import express from "express";
import commentRoute from "./routes/commentsRouters.js";
import episodeRoute from "./routes/episodesRouters.js";
import genreRoute from "./routes/genresRouters.js";
import movieRoute from "./routes/moviesRouters.js";
import userRoute from "./routes/auth/userRoute.js";
import watchlogRoute from "./routes/watchLogsRouters.js";
import path from "path";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import authRoute from "./routes/auth/authRoute.js";
import cookieParser from "cookie-parser";
import { protectedRoute } from "./middlewares/authMiddleware.js";
import cors from "cors";
dotenv.config();

// Lấy __dirname khi sử dụng ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5001;
const app = express();

// Middlewares
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Middleware để phục vụ các file trong thư mục 'uploads'
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// public routes
app.use("/api/movies", movieRoute);
app.use("/api/comments", commentRoute);
app.use("/api/episodes", episodeRoute);
app.use("/api/genres", genreRoute);
app.use("/api/watchlogs", watchlogRoute);
app.use("/api/auth", authRoute);

// private routes
app.use(protectedRoute);
app.use("/api/users", userRoute);
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server chạy trên cổng ${PORT}`);
  });
});
