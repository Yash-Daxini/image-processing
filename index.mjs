import express from "express";
import uploadCsv from "./routes/uploadCsvRouter.mjs";
import statusRouter from "./routes/statusRouter.mjs";
import bodyParser from "body-parser";
import "dotenv/config.js";
const app = express();
const port = process.env.PORT;

app.use(express.static("./outputImages"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/upload-csv", uploadCsv);
app.use("/status", statusRouter);

app.listen(port, () => {
  console.log("Server started");
});
