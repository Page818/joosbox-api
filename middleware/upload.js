const multer = require("multer");

// 使用記憶體儲存（不寫入磁碟）
const storage = multer.memoryStorage();

// 欄位名稱為 image（或 images）
const upload = multer({
	storage,
	limits: {
		fileSize: 5 * 1024 * 1024, // 最多 5MB
	},
});

module.exports = upload;
