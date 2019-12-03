const Contents = require('../models/contents');

exports.getAllContents = (req, res, next) => {
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
};

exports.createContent = (req, res, next) => {
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
  }).catch(error => {
    res.json({
      message: 'failed'
    })
  });
};

exports.deleteContent = (req, res, next) => {
  Contents.deleteOne({_id: req.params.id}).then(value => {
    res.json({
      message: 'done'
    })
  })
};

exports.updateContent = (req, res, next) => {
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
};

exports.singleContent = (req, res, next) => {
  Contents.findById(req.params.id).then(content => {
    if (content) {
      res.json(content);
    } else {
      res.status(404).json({
        message: 'no content'
      })
    }
  })
};

exports.categoryContent =(req, res, next) => {
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
};
