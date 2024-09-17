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
import { convertJsonToCSV } from "../utils/jsontocsv.mjs";
const router = express.Router();

const imageMap = new Map();
const inputImageMap = new Map();

router.post("/", upload.single("file"), async (req, res) => {
  let jsonData = await parseCSVToJSON(req.file.path);
  let requestId = generateUniqueRequestId();
  res.json({ requestId });
  const insertedRequestId = await insertRequest(requestId);

  await insertProductDetails(jsonData, insertedRequestId);

  startImageCompression(jsonData);

  await updateRequestStatus(requestId);

  await updateOutputImageUrl(imageMap);

  addOutputImageUrlsInOriginalJSON(imageMap, jsonData);

  convertJsonToCSV(jsonData, requestId);
});

const startImageCompression = (products) => {
  products.forEach((product) => {
    let count = 0;
    product["Input Image Urls"].forEach(async (image) => {
      const outputImageName = `${product["Product Name"]}-${count++}.webp`;
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

const insertProductDetails = async (data, request_Id) => {
  data.forEach(async (element) => {
    let product = new Product(
      parseInt(request_Id),
      parseInt(element["S. No."]),
      element["Product Name"]
    );

    let productId = await insertRecord("Products", product);
    await insertImageForSpecificProduct(element, productId);
  });
};

const insertImageForSpecificProduct = async (product, product_Id) => {
  product["Input Image Urls"].forEach(async (element) => {
    inputImageMap.set(element, parseInt(product["S. No."]));
    const image = new Image(parseInt(product_Id), element, null);
    await insertRecord("Images", image);
  });
};

const updateOutputImageUrl = async (imageMap) => {
  for (const [key, value] of imageMap) {
    await updateOutputImage(key, value);
  }
};

const addOutputImageUrlsInOriginalJSON = (imageMap, jsonData) => {
  jsonData.forEach((product) => {
    product["Input Image Urls"].forEach((image) => {
      let index = inputImageMap.get(image);
      let value = imageMap.get(image);
      if (!jsonData[index - 1]["Output Image Urls"])
        jsonData[index - 1]["Output Image Urls"] = [value];
      else jsonData[index - 1]["Output Image Urls"].push(value);
    });
  });
};

export default router;
