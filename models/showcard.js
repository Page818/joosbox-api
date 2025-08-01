const mongoose = require("mongoose");

const showcardSchema = new mongoose.Schema(
	{
		imageUrl: {
			type: String,
			required: true,
		},
		publicId: {
			type: String,
			required: true,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
	},
	{ versionKey: false }
);

module.exports = mongoose.model("Showcard", showcardSchema);
