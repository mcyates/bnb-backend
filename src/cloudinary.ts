// @ts-ignore
import cloudinary from "cloudinary/lib/v2";
import fs from "fs";

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API,
	api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadImage = async (file: any) => {
	const { stream, filename, mimetype, encoding } = await file;
	console.log(stream);
	let resultUrl = "",
		resultSecureUrl = "";
	const cloudinaryUpload = async (stream: any) => {
		const url = await new Promise((resolve, reject) => {
				const streamLoad = cloudinary.uploader.upload_stream(
					(error: any, result: any) => {
						if (result) {
              console.log(result);
							resultUrl = result.secure_url;
							resultSecureUrl = result.secure_url;
							resolve(resultUrl);
						} else {
							reject(error);
						}
					}
				);
				stream.pipe(streamLoad);
      });
      return url
  };
  const iUrl = await cloudinaryUpload(stream);

	return iUrl;
};

export { uploadImage };
