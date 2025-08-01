const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	description: {
		type: String,
		default: "",
	},
	category: {
		type: String,
		index: true,
		default: "Uncategorized",
	},
	images: {
		type: [String], // 陣列，存圖片 URL
		default: [],
	},
	tags: {
		type: [String],
		index: true,
		default: [],
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
});

// 每次儲存時自動更新 updatedAt
productSchema.pre("save", function (next) {
	this.updatedAt = Date.now();
	next();
});

// 建立文字索引（全文搜尋）
productSchema.index({ name: "text", description: "text" });

module.exports = mongoose.model("Product", productSchema);
