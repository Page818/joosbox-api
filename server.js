const dotenv = require("dotenv");
dotenv.config(); // 載入 .env 環境變數
console.log("目前使用的 JWT_SECRET：", process.env.JWT_SECRET);
const jwt = require("jsonwebtoken");


const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const showcardRoutes = require("./routes/showcard");
const topImageRoutes = require("./routes/topImage");
const footerContentRoutes = require("./routes/footerContent");
const adminAuthRouter = require("./routes/adminAuth");

// 顯示 Cloudinary 資訊供除錯用
console.log("Loaded CLOUD_NAME:", process.env.CLOUD_NAME);
console.log("Loaded API_KEY:", process.env.API_KEY);
console.log("Loaded API_SECRET:", process.env.API_SECRET);

const app = express();

// 中間件
app.use(cors());
app.use(express.json());

// 掛載 API 路由
app.use("/api/products", productRoutes);
app.use("/api/showcards", showcardRoutes);
app.use("/api/topimages", topImageRoutes);
app.use("/api/footercontent", footerContentRoutes);
app.use("/api/admin", adminAuthRouter);

// 連接資料庫
connectDB();

// 啟動伺服器
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`✅ Server running on http://localhost:${PORT}`);
});
