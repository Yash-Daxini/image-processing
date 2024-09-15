import sharp from "sharp";
import axios from "axios";
import fs from "fs";

export const compressImage = async (url, compressedFileName) => {

  try {
    const response = await axios({
      url,
      responseType: "arraybuffer",
    });

    if (!fs.existsSync('./outputImages')) {
      fs.mkdirSync("./outputImages");
    }

    const timestamp = new Date().toISOString().split("T")[0];
    const ref = `${timestamp}-${compressedFileName}.webp`;

    await sharp(response.data)
      .webp({ quality: 50 })
      .toFile(`./outputImages/${ref}`);

    console.log("Image compressed successfully!");
  } catch (error) {
    console.error("Error compressing image:", error);
  }
};
