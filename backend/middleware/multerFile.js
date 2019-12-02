const multer = require('multer');

const MIME_TYPE = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

// The multer method for storing images in the backend folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE[file.mimetype];
    let error = new Error();
    if (isValid) {
      error = null;
    } else {
      error = 'wrong file type';
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

module.exports = multer({storage: storage}).single("image");
