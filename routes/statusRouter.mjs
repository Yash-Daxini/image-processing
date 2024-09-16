import express from "express";
import { readStatusOfRequest } from "../dbOperations/read.mjs";
const router = express.Router();

router.get("/", async (req, res) => {
  if (!req) res.json({ error: "Invalid input" });

  const status = await readStatusOfRequest(req.body.requestId);

  res.json(status);
});

export default router;
