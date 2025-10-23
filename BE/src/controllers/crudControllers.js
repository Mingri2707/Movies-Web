export const getAll = (Model) => async (req, res) => {
  try {
    const docs = await Model.find().sort({ createdAt: -1 });
    res.json(docs);
  } catch (error) {
    console.error("Lỗi khi gọi getAll", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const create = (Model) => async (req, res) => {
  try {
    const doc = new Model(req.body);
    await doc.save();
    res.status(201).json(doc);
  } catch (error) {
    console.error("Lỗi khi gọi create", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const update = (Model) => async (req, res) => {
  try {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!doc) return res.status(404).json({ error: "Không tìm thấy" });
    res.json(doc);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const remove = (Model) => async (req, res) => {
  try {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ error: "Không tìm thấy" });
    res.json({ message: "Xóa thành công " });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
