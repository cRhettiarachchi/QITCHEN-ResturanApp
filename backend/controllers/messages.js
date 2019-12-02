const Message = require('../models/message');

exports.creteMessage = (req, res, next) => {
  const message = new Message({
    email: req.body.email,
    name: req.body.name,
    message: req.body.message
  });
  message.save().then(value => {
    console.log('value');
    res.status(200).json({
      message: 'Successful',
    })
  }).catch(err => {
    res.status(201).json({
      message: 'failed'
    })
  });
};

exports.readMessages = (req, res, next) => {
  Message.find().then(values => {
    res.json({
      message: 'success',
      messages: values
    })
  })
};

exports.deleteMessage = (req, res, next) => {
  Message.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.json({
      message: 'done',
      result: result
    })
  })
};
