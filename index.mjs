import express from "express";
import uploadCsv from "./routes/uploadCsvRouter.mjs";
import bodyParser from "body-parser";
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/upload-csv", uploadCsv);

app.listen(port, () => {
  console.log("Server started");
});
