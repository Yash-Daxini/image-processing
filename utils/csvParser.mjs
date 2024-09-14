import fs from "fs";
import csv from "csv-parser";

export const parseCSVToJSON = (filePath) => {
  let results = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => {
        if (data["Input Image Urls"]) {
          data["Input Image Urls"] = data["Input Image Urls"]
            .split(",")
            .map((url) => url.trim().replace('"', "")); // Remove extra spaces/newlines
        }
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
