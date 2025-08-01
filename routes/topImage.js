const express = require("express");
const router = express.Router();


const upload = require("../middleware/upload"); // memoryStorage 上傳
const { uploadToCloudinary, cloudinary } = require("../utils/cloudinary");
const TopImage = require("../models/topImage");

// 上傳圖片
router.post("/", upload.single("image"), async (req, res) => {
	try {
		if (!req.file) return res.status(400).json({ message: "未上傳檔案" });

		const result = await uploadToCloudinary(req.file.buffer, "topImages"); // 存進 topImages 資料夾

		const newImage = await TopImage.create({
			imageUrl: result.secure_url,
			publicId: result.public_id,
		});

		res.status(201).json(newImage);
	} catch (err) {
		console.error("上傳錯誤:", err);
		res.status(500).json({ message: "圖片上傳失敗" });
	}
});

// 取得所有圖片
router.get("/", async (req, res) => {
	try {
		const images = await TopImage.find().sort({ createdAt: -1 });
		res.json(images);
	} catch (err) {
		res.status(500).json({ message: "取得失敗" });
	}
});

// 刪除圖片
router.delete("/:id", async (req, res) => {
	try {
		const target = await TopImage.findById(req.params.id);
		if (!target) return res.status(404).json({ message: "找不到圖片" });

		await cloudinary.uploader.destroy(target.publicId);
		await target.deleteOne();

		res.json({ message: "刪除成功" });
	} catch (err) {
		console.error("刪除錯誤:", err);
		res.status(500).json({ message: "刪除失敗" });
	}
});

module.exports = router;
