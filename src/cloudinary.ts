// @ts-ignore
import cloudinary from "cloudinary/lib/v2";

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API,
	api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadImage = async (file: any) => {
  const iUrl = await cloudinary.uploader.upload(file, { quality: 75},(err: any, res: any) => {
    if (err) {
      throw new Error(err);
    }
    return res.secure_url;
  });
  
  return iUrl;
};

export { uploadImage };
