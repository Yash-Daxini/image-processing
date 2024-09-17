import { Parser } from "json2csv";
import fs from "fs";
import "dotenv/config";

export const convertJsonToCSV = (data, fileName) => {
  const csv = new Parser().parse(data);
  fs.writeFileSync(`${process.env.OutputCSVPath}/${fileName}`, csv);
};
