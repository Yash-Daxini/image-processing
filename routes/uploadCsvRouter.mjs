import express from "express";
import { parseCSVToJSON } from "../utils/csvParser.mjs";
import { generateUniqueRequestId } from "../utils/uniqueRequestIdGenerator.mjs";
import upload from "../utils/uploadCsv.mjs";
import Product from "../dbOperations/models/product.mjs";
import Image from "../dbOperations/models/image.mjs";
import Request from "../dbOperations/models/request.mjs";
import { insertRecord } from "../dbOperations/insert.mjs";
const router = express.Router();

router.post("/", upload.single("file"), async (req, res) => {
  let jsonData = await parseCSVToJSON(req.file.path);
  let requestId = generateUniqueRequestId();
  await insertIntoDB(jsonData, requestId);
  res.json({ requestId });
});

let insertIntoDB = async (data, requestId) => {
  try {
    let date = new Date();

    const request = new Request(requestId, "pending", date, date);
    let request_Id = await insertRecord("Requests", request);

    data.forEach(async (element) => {
      let product = new Product(
        parseInt(request_Id),
        parseInt(element["S. No."]),
        element["Product Name"]
      );

      const product_Id = await insertRecord("Products", product);

      element["Input Image Urls"].forEach(async (element) => {
        const image = new Image(parseInt(product_Id), element, null);
        await insertRecord("Images", image);
      });
    });
  } catch (err) {
    console.error("SQL error", err);
  }
};

export default router;
