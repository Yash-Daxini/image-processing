import { Parser } from "json2csv";
import fs from "fs/promises";
import "dotenv/config";

export const convertJsonToCSV = async (data, fileName) => {
  const csv = new Parser().parse(data);
  await fs.writeFile(`${process.env.OutputCSVPath}/${fileName}.csv`, csv);
};
