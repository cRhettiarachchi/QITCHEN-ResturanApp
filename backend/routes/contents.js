const express = require('express');
const router = express.Router();
const Contents = require('../models/contents');
const checkAuth = require('../middleware/check-auth');
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
router.get('', (req, res, next) => {
  let pageSize = +req.query.pagesize;
  let pageIndex = +req.query.pageindex;
  let updatedDocuments;
  const contentFind = Contents.find();
  // if(pageSize & pageIndex) {
  contentFind
    .limit(pageSize).skip(pageSize * (pageIndex - 1));
  // }
  contentFind
    .then((documents) => {
      updatedDocuments = documents;
      return Contents.count();
    }).then(count => {
      console.log(count);
    res.json({
      message: 'good',
      contents: updatedDocuments,
      count: count
    })
  })
});

// Post method to create new content
router.post('', checkAuth, multer({storage: storage}).single("image"), (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const content = new Contents({
    heading: req.body.heading,
    description: req.body.description,
    category: req.body.category,
    price: +req.body.price,
    imagePath: url + '/images/' + req.file.filename
  });
  content.save().then((value) => {
    console.log(value._id);
    res.status(200).json({
      message: "done",
      contentValue: {
        id: value._id,
        heading: value.heading,
        description: value.description,
        category: value.category,
        imagePath: value.imagePath
      }
    });
  });
});

// delete method
router.delete('/:id', checkAuth, (req, res, next) => {
  Contents.deleteOne({_id: req.params.id}).then(value => {
    res.json({
      message: 'done'
    })
  })
});

// to update a content
router.patch('/:id', checkAuth, multer({storage: storage}).single("image"), (req, res, next) => {
  let imgPath;
  if (req.file) {
    const url = req.protocol + '://' + req.get('host');
    imgPath = url + '/images/' + req.file.filename;
  } else {
    imgPath = req.body.imagePath;
  }
  const updateContent = {
    heading: req.body.heading,
    description: req.body.description,
    category: req.body.category,
    price: +req.body.price,
    imagePath: imgPath
  };
  Contents.updateOne({_id: req.params.id}, updateContent).then(value => {
    console.log('updated successfully');
    res.json({
      message: 'done'
    })
  });
}); // end of update method

// find one method for finding a single content
router.get('/:id', (req, res, next) => {
  Contents.findById(req.params.id).then(content => {
    if (content) {
      res.json(content);
    } else {
      res.status(404).json({
        message: 'no content'
      })
    }
  })
});

router.get('/single/:type', (req, res, next) => {
  let pageSize = +req.query.pagesize;
  let pageIndex = +req.query.pageindex;
  let updatedDocuments;
  const contentFind = Contents.find({category: req.params.type});
  contentFind
    .limit(pageSize).skip(pageSize * (pageIndex - 1));
  contentFind.then((documents) => {
    updatedDocuments = documents;
    return Contents.count({category: req.params.type});
  }).then(count => {
    console.log(count);
    res.json({
      contents: updatedDocuments,
      count: count
    })
  })
});

module.exports = router;
