import Movie from "../models/Movie.js";
import Genre from "../models/Genre.js";
import * as crud from "./crudControllers.js";

// Parse genres: chuỗi JSON, chuỗi thường, hoặc mảng
function parseGenresInput(input) {
  try {
    if (typeof input === "string") {
      return input.trim().startsWith("[")
        ? JSON.parse(input)
        : input.split(",").map((g) => g.trim());
    } else if (Array.isArray(input)) {
      return input;
    } else {
      return [];
    }
  } catch (error) {
    throw new Error(
      "Định dạng genres không hợp lệ. Phải là array hoặc comma-separated string bằng dấu phẩy."
    );
  }
}

// Chuyển tên genre thành ObjectId từ collection Genre
async function resolveGenreNames(names = []) {
  const genres = await Genre.find({ name: { $in: names } });
  if (genres.length !== names.length) {
    throw new Error("Không tìm thấy 1 vài genres có sẵn");
  }
  return genres.map((g) => g._id);
}

export const createMovie = async (req, res) => {
  try {
    const {
      title,
      slug,
      description,
      releaseDate,
      genres,
      country,
      duration,
      status,
      studio,
      poster: posterFromBody,
      thumbnail: thumbnailFromBody,
    } = req.body;

    const genreNames = parseGenresInput(genres);
    const genreIds = await resolveGenreNames(genreNames);

    const poster = req.files?.poster
      ? "/uploads/" + req.files.poster[0].filename
      : posterFromBody || "";

    const thumbnail = req.files?.thumbnail
      ? "/uploads/" + req.files.thumbnail[0].filename
      : thumbnailFromBody || "";

    // Xử lý characters (2 kiểu: characters hoặc characterNames + files)
    let characters = [];
    // nếu có field characters trong body
    if (req.body.characters) {
      try {
        const parsed =
          typeof req.body.characters === "string"
            ? JSON.parse(req.body.characters)
            : req.body.characters;
        // Nếu là chuỗi JSON: parse thành object.
        // Nếu đã là object: giữ nguyên.

        if (Array.isArray(parsed)) {
          characters = parsed;
        } else {
          return res
            .status(400)
            .json({ message: "Định dạng characters không hợp lệ" });
        }
        // Nếu parse thành mảng (danh sách nhân vật) → gán vào characters.
        // Nếu không phải mảng → trả lỗi HTTP 400: "Định dạng không hợp lệ".
      } catch (e) {
        return res
          .status(400)
          .json({ message: "field JSON characters không hợp lệ" });
      }
      // Nếu ko có field characters trong body, kiểm tra characterNames.
    } else {
      // Parse chuỗi JSON characterNames thành mảng tên.
      const characterNames = req.body.characterNames
        ? JSON.parse(req.body.characterNames)
        : [];
      // Lấy danh sách file ảnh từ req.files.characters (sử dụng multer để upload file).
      const characterImages = req.files?.characters || [];

      if (characterNames.length !== characterImages.length) {
        return res.status(400).json({
          message: "Số lượng nhân vật và ảnh không khớp",
        });
      }
      // Duyệt qua characterNames, tạo mảng characters với mỗi phần tử gồm
      characters = characterNames.map((name, index) => ({
        name,
        image: characterImages[index]
          ? "/uploads/" + characterImages[index].filename
          : "",
      }));
    }

    const movie = await Movie.create({
      title,
      slug,
      description,
      releaseDate,
      genres: genreIds,
      country,
      duration,
      status,
      studio,
      poster,
      thumbnail,
      characters,
    });

    res.status(201).json(movie);
  } catch (err) {
    console.error("Tạo phim bị lỗi: ", err);
    res.status(500).json({ message: "Tạo phim thất bại" });
  }
};

export const updateMovie = async (req, res) => {
  try {
    const movieId = req.params.id;

    const {
      title,
      slug,
      description,
      releaseDate,
      genres,
      country,
      duration,
      status,
      studio,
      poster: posterFromBody,
      thumbnail: thumbnailFromBody,
    } = req.body;

    const genreNames = parseGenresInput(genres);
    const genreIds = await resolveGenreNames(genreNames);

    const poster = req.files?.poster
      ? "/uploads/" + req.files.poster[0].filename
      : posterFromBody;

    const thumbnail = req.files?.thumbnail
      ? "/uploads/" + req.files.thumbnail[0].filename
      : thumbnailFromBody;

    let characters = [];

    if (req.body.characters) {
      try {
        const parsed =
          typeof req.body.characters === "string"
            ? JSON.parse(req.body.characters)
            : req.body.characters;

        if (Array.isArray(parsed)) {
          characters = parsed;
        } else {
          return res
            .status(400)
            .json({ message: "Định dạng characters không hợp lệ" });
        }
      } catch (e) {
        return res
          .status(400)
          .json({ message: "field JSON characters không hợp lệ" });
      }
    } else {
      const characterNames = req.body.characterNames
        ? JSON.parse(req.body.characterNames)
        : [];

      const characterImages = req.files?.characters || [];

      if (characterNames.length !== characterImages.length) {
        return res.status(400).json({
          message: "Số lượng nhân vật và ảnh không khớp",
        });
      }

      characters = characterNames.map((name, index) => ({
        name,
        image: characterImages[index]
          ? "/uploads/" + characterImages[index].filename
          : "",
      }));
    }

    const updatedMovie = await Movie.findByIdAndUpdate(
      movieId,
      {
        title,
        slug,
        description,
        releaseDate,
        genres: genreIds,
        country,
        duration,
        status,
        studio,
        ...(poster && { poster }),
        ...(thumbnail && { thumbnail }),
        characters,
      },
      { new: true }
    );

    if (!updatedMovie) {
      return res.status(404).json({ message: "Ko tìm thấy phim" });
    }

    res.status(200).json(updatedMovie);
  } catch (err) {
    console.error("Cập nhật phim bị lỗi: ", err);
    res.status(500).json({ message: "Cập nhật thất bại" });
  }
};

export const getAllMovies = crud.getAll(Movie);

export const deleteMovie = crud.remove(Movie);
