const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const ControllerContents = require('../controllers/contents');
const multer = require('multer');

// backend mime type check
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
}); // end of multer method

// Get method to get all the content
router.get('', ControllerContents.getAllContents);

// Post method to create new content
router.post('', checkAuth, multer({storage: storage}).single("image"), ControllerContents.createContent);

// delete method
router.delete('/:id', checkAuth, ControllerContents.deleteContent);

// to update a content
router.patch('/:id', checkAuth, multer({storage: storage}).single("image"), ControllerContents.updateContent); // end of update method

// find one method for finding a single content
router.get('/:id', ControllerContents.singleContent);

router.get('/single/:type', ControllerContents.categoryContent);

module.exports = router;
