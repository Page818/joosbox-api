const mongoose = require("mongoose");

const FooterContentSchema = new mongoose.Schema({
	text: {
		type: String,
		required: true,
	},
	links: [
		{
			label: String,
			url: String,
		},
	],
});

module.exports = mongoose.model("FooterContent", FooterContentSchema);
