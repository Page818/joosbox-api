// routes/footerContent.js
const express = require("express");
const FooterContent = require("../models/FooterContent");

const router = express.Router();

// 取得 Footer 資料
router.get("/", async (req, res) => {
	try {
		let content = await FooterContent.findOne();
		if (!content) {
			content = await FooterContent.create({ text: "", links: [] });
		}
		res.json(content);
	} catch (err) {
		console.error("GET /footercontent 錯誤:", err);
		res.status(500).json({ error: "伺服器錯誤" });
	}
});

// 更新 Footer 資料
router.put("/", async (req, res) => {
	try {
		let content = await FooterContent.findOne();
		if (!content) {
			content = await FooterContent.create(req.body);
		} else {
			content.text = req.body.text;
			content.links = req.body.links;
			await content.save();
		}
		res.json(content);
	} catch (err) {
		console.error("PUT /footercontent 錯誤:", err);
		res.status(500).json({ error: "更新失敗" });
	}
});

module.exports = router;
