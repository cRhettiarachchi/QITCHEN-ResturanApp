const express = require('express');
const router = express.Router();
const Contents = require('../models/contents');

// 2orBJk23OtCucTyp

router.get('', (req, res, next) => {
  Contents.find()
    .then((documents) => {
      res.json({
        message: 'good',
        contents: documents
      });
    })
});

router.post('', (req, res, next) => {
  const content = new Contents({
    heading: req.body.heading,
    description: req.body.description,
    category: req.body.category
  });
  content.save().then((value) => {
    res.status(200).json({
      message: "done",
      id: value._id
    });
  });
});

router.delete('/:id', (req, res, next) => {
  console.log('delete mehtod called');
  Contents.deleteOne({_id: req.params.id}).then(value => {
    console.log('deletion is done');
    res.json({
      message: 'done'
    })
  })
});

router.patch('/:id', (req, res, next) => {
  const updateContent = {
    heading: req.body.heading,
    description: req.body.description,
    category: req.body.category
  };
  Contents.updateOne({_id: req.params.id}, updateContent).then(value => {
    console.log('updated successfully');
    res.json({
      message: 'done'
    })
  });
});

router.get('/:id', (req, res, next) => {
  Contents.findById(req.params.id).then(content => {
    if(content) {
      res.json(content);
    } else {
      res.status(404).json({
        message: 'no content'
      })
    }
  })
});

module.exports = router;
