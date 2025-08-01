// 數據庫連接
const mongoose = require("mongoose");

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("MongoDB 連接成功");
	} catch (error) {
		console.error("MongoDB 連接失敗", error);
		process.exit(1);
	}
};

module.exports = connectDB;
