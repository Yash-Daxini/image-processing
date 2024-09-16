import express from "express";
import { parseCSVToJSON } from "../utils/csvParser.mjs";
import { generateUniqueRequestId } from "../utils/uniqueRequestIdGenerator.mjs";
import upload from "../utils/uploadCsv.mjs";
import Product from "../dbOperations/models/product.mjs";
import Image from "../dbOperations/models/image.mjs";
import Request from "../dbOperations/models/request.mjs";
import { insertRecord } from "../dbOperations/insert.mjs";
import { compressImage } from "../utils/compressImages.mjs";
import {
  updateOutputImage,
  updateRequestStatus,
} from "../dbOperations/update.mjs";
const router = express.Router();

const imageMap = new Map();

router.post("/", upload.single("file"), async (req, res) => {
  let jsonData = await parseCSVToJSON(req.file.path);
  let requestId = generateUniqueRequestId();
  res.json({ requestId });
  const insertedRequestId = await insertRequest(requestId);
  const productId = await insertProduct(jsonData, insertedRequestId);
  await insertImage(jsonData, productId);
  await startImageCompression(jsonData);

  await updateOutputImageUrl(imageMap);

  await updateRequestStatus(requestId);
});

const startImageCompression = async (products) => {
  products.forEach(async (product) => {
    let count = 0;
    product["Input Image Urls"].forEach(async (image) => {
      const outputImageName = `${product["Product Name"]}-${count++}`;
      imageMap.set(image, outputImageName);
      await compressImage(image, outputImageName);
    });
  });
};

const insertRequest = async (requestId) => {
  try {
    let date = new Date();

    const request = new Request(requestId, "pending", date, date);
    return await insertRecord("Requests", request);
  } catch (err) {
    console.error("SQL error", err);
  }
};

const insertProduct = async (data, request_Id) => {
  data.forEach(async (element) => {
    let product = new Product(
      parseInt(request_Id),
      parseInt(element["S. No."]),
      element["Product Name"]
    );

    return await insertRecord("Products", product);
  });
};

const insertImage = async (data, product_Id) => {
  data.forEach(async (element) => {
    element["Input Image Urls"].forEach(async (element) => {
      const image = new Image(parseInt(product_Id), element, null);
      await insertRecord("Images", image);
    });
  });
};

const updateOutputImageUrl = async (imageMap) => {
  for (const [key, value] of imageMap) {
    await updateOutputImage(key, value);
  }
};

export default router;
