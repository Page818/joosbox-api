const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

cloudinary.config({
	cloud_name: "da1owallk",
	api_key: "954784585335347",
	api_secret: "5NCLEDPf8qE0-XYSN1B5yRTVOYA",
});

// 封裝 upload function（支援 buffer）
const uploadToCloudinary = (fileBuffer, folder = "general") => {
	return new Promise((resolve, reject) => {
		const uploadStream = cloudinary.uploader.upload_stream(
			{
				folder,
				transformation: [{ width: 800, height: 800, crop: "limit" }],
			},
			(error, result) => {
				if (result) resolve(result);
				else reject(error);
			}
		);

		streamifier.createReadStream(fileBuffer).pipe(uploadStream);
	});
};

module.exports = {
	cloudinary,
	uploadToCloudinary,
};
