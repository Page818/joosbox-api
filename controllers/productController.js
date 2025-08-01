const Product = require("../models/Product");
const { uploadToCloudinary } = require("../utils/cloudinary");
const { deleteFromCloudinary } = require("../utils/cloudinary");

// 上傳產品資料與圖片（多張）
exports.uploadProduct = async (req, res) => {
	try {
		const { name, description, category, tags, link } = req.body;

		if (!req.files || req.files.length === 0) {
			return res.status(400).json({ message: "請上傳至少一張圖片" });
		}

		// 上傳每張圖片到 Cloudinary
		const uploads = await Promise.all(
			req.files.map((file) => uploadToCloudinary(file.buffer, "necklaces"))
		);

		const product = new Product({
			name,
			description,
			category,
			link,
			images: uploads.map((file) => file.secure_url),
			imageIds: uploads.map((file) => file.public_id),
			tags: tags ? tags.split(",") : [],
		});

		await product.save();
		res.status(201).json({ message: "產品上傳成功", product });
	} catch (error) {
		console.error("產品上傳錯誤:", error);
		res.status(500).json({ message: "上傳失敗", error: error.message });
	}
};

// 取得所有產品
exports.getProducts = async (req, res) => {
	try {
		const products = await Product.find();
		res.json(products);
	} catch (error) {
		res.status(500).json({ message: "獲取產品失敗", error: error.message });
	}
};

//刪除商品
exports.deleteProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		if (!product) return res.status(404).json({ message: "找不到商品" });

		// 刪除所有 cloudinary 圖片
		const { cloudinary } = require("../utils/cloudinary");
		const deleteResults = await Promise.all(
			product.images.map((url) => {
				// 從 URL 中取出 publicId
				const segments = url.split("/");
				const filename = segments.pop().split(".")[0];
				const folder = segments[segments.length - 1];
				const publicId = `${folder}/${filename}`;
				return cloudinary.uploader.destroy(publicId);
			})
		);

		await product.deleteOne();
		res.json({ message: "刪除成功", deleted: deleteResults });
	} catch (error) {
		console.error("刪除錯誤:", error);
		res.status(500).json({ message: "刪除失敗", error: error.message });
	}
};
