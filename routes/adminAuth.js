const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin"); 

const router = express.Router();

router.post("/login", async (req, res) => {
	const { account, password } = req.body;
	const admin = await Admin.findOne({ account });

	if (!admin) return res.status(401).json({ message: "帳號錯誤" });

	const validPassword = await bcrypt.compare(password, admin.password);
	if (!validPassword) return res.status(401).json({ message: "密碼錯誤" });

	const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
		expiresIn: "2h",
	});
	res.json({ token, message: "登入成功" });
});

module.exports = router;
