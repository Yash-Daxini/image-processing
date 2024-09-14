import express from "express";
import { parseCSVToJSON } from "../utils/csvParser.mjs";
import { generateUniqueRequestId } from "../utils/uniqueRequestIdGenerator.mjs";
import upload from "../utils/uploadCsv.mjs";
const router = express.Router();

router.post("/", upload.single("file"), async (req, res) => {
  let jsonData = await parseCSVToJSON(req.file.path);
  console.warn(jsonData);
  let requestId = generateUniqueRequestId();
  res.json({ requestId });
});

export default router;
