import express from "express";
import { readStatusOfRequest } from "../dbOperations/read.mjs";
const router = express.Router();

router.get("/:requestId", async (req, res) => {
  if (!req) res.json({ error: "Invalid input" });

  const status = await readStatusOfRequest(req.params.requestId);

  res.json(status);
});

export default router;
