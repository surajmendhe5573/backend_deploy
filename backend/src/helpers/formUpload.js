import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedFormats = [".pdf", ".doc", ".docx", ".xlsx"];
  const fileExt = file.originalname.slice(file.originalname.lastIndexOf(".")).toLowerCase();

  if (allowedFormats.includes(fileExt)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF, DOC, DOCX, and XLSX files are allowed"), false);
  }
};

const uploadPdf = multer({
  storage,
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 } 
});

export default uploadPdf;
