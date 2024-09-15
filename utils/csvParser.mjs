import fs from "fs";
import csv from "csv-parser";

export const parseCSVToJSON = (filePath) => {
  let results = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => {
        data = parseCSVData(data);
        results.push(data);
      })
      .on("end", () => {
        resolve(results);
      })
      .on("error", (err) => {
        reject(err);
      });
  });
};

const parseSerialNumber = (serialNumber) => {
  return serialNumber.trim().substring(0, serialNumber.length - 1);
};

const parseImageURLs = (imageURLs) => {
  return imageURLs
    .trim()
    .split(",")
    .map((url) => url.trim().replace('"', ""));
};

const parseCSVData = (data) => {
  const serialNumber = data["S. No."];
  const imageURLs = data["Input Image Urls"];
  const productName = data["Product Name"];
  if (serialNumber) {
    data["S. No."] = parseSerialNumber(serialNumber);
  }
  if (imageURLs) {
    data["Input Image Urls"] = parseImageURLs(imageURLs);
  }
  if (productName) data["Product Name"] = productName.trim();
  return data;
};
