import multer from "multer";
import path from "path";

const filterOption = (req, file, cb) => {
  var ext = path.extname(file.originalname);
  if (ext == ".csv") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

var upload = multer({ storage: storage, fileFilter: filterOption });

export default upload;
