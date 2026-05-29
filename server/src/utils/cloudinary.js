import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const UploadToCloud = async (filepath) => {
  try {
    if (!filepath) {
      return null;
    }
    if (!fs.existsSync(filepath)) {
      console.log("file doesn't exist");
      return null;
    }
    console.log("uploading file to the cloud...");

    const res = await cloudinary.uploader.upload(filepath, {
      resource_type: "auto",
    });

    if (res) {
      console.log("file has been uploaded successfully");
    }
    fs.unlinkSync(filepath);
    return res;
  } catch (error) {
    fs.unlinkSync(filepath);
    console.error(error.message);
    return null;
  }
};

const DeleteFromCloud = async (public_id) => {
  if (!public_id) {
    return false;
  }
  try {
    console.log("deleting file from cloud...");
    await cloudinary.uploader.destroy(public_id);
    console.log("file deleted from cloud");
    return true;
  } catch (error) {
    console.log("failed to delete file from cloud");
    console.error(error.message);
    return false;
  }
};

export { UploadToCloud, DeleteFromCloud };
