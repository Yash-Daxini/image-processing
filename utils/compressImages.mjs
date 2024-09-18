import sharp from "sharp";
import axios from "axios";
import "dotenv/config";

export const compressImage = async (url, compressedFileName) => {
  try {
    const response = await axios({
      url,
      responseType: "arraybuffer",
    });

    const ref = `${compressedFileName}`;

    await sharp(response.data)
      .webp({ quality: 50 })
      .toFile(`${process.env.OutputImagePath}/${ref}`);
  } catch (error) {
    console.error("Error compressing image:", error);
  }
};
