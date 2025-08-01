const express = require("express");
const router = express.Router();


const upload = require("../middleware/upload");
const { uploadToCloudinary, cloudinary } = require("../utils/cloudinary");
const Showcard = require("../models/showcard");

// 上傳一張圖片
router.post("/", upload.single("image"), async (req, res) => {
	try {
		if (!req.file) return res.status(400).json({ message: "未上傳檔案" });

		const result = await uploadToCloudinary(req.file.buffer, "bracelets"); // 存進 Cloudinary 資料夾

		const newCard = await Showcard.create({
			imageUrl: result.secure_url,
			publicId: result.public_id,
		});

		res.status(201).json(newCard);
	} catch (err) {
		console.error("上傳錯誤:", err);
		res.status(500).json({ message: "圖片上傳失敗" });
	}
});

// 取得所有圖片
router.get("/", async (req, res) => {
	try {
		const images = await Showcard.find().sort({ createdAt: -1 });
		res.json(images);
	} catch (err) {
		res.status(500).json({ message: "取得失敗" });
	}
});

// 刪除圖片
router.delete("/:id", async (req, res) => {
	try {
		const target = await Showcard.findById(req.params.id);
		if (!target) return res.status(404).json({ message: "找不到圖片" });

		await cloudinary.uploader.destroy(target.publicId);
		await target.deleteOne();

		res.json({ message: "刪除成功" });
	} catch (err) {
		console.error("刪除錯誤:", err);
		res.status(500).json({ message: "刪除失敗" });
	}
});

// ✅ 必須匯出 router
module.exports = router;
