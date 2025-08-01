// routes/productRoutes.js
const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/auth"); 

const {
  uploadProduct,
  getProducts,
  deleteProduct,
} = require("../controllers/productController");

const upload = require("../middleware/upload");

// ✅ 開放查詢（前台用）
router.get("/", getProducts);

// ✅ 管理員操作：新增、刪除需驗證
router.post("/upload", verifyToken, upload.array("images", 5), uploadProduct);
router.delete("/:id", verifyToken, deleteProduct);

module.exports = router;
