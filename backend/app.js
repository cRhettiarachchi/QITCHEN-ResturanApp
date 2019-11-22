const express = require('express');
const bodyparser = require('body-parser');
const app = express();

// app.use((req, res, next) => {
//   res.send('this is great');
// });

app.use(bodyparser.json());

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/contents', (req, res, next) => {
  const contents = [{
    id: '1',
    heading: 'food 1',
    desc: 'this is one of the best food available',
    category: 'breakfast'
  },
    {
      id: '2',
      heading: 'food 2',
      desc: 'this is one of the best food available',
      category: 'breakfast'
    },
    {
      id: '3',
      heading: 'food 3',
      desc: 'this is one of the best food available',
      category: 'breakfast'
    },
    {
      id: '4',
      heading: 'food 4',
      desc: 'this is one of the best food available',
      category: 'breakfast'
    },
    {
      id: '5',
      heading: 'food 5',
      desc: 'this is one of the best food available',
      category: 'dinner'
    },
    {
      id: '6',
      heading: 'food 6',
      desc: 'this is one of the best food available',
      category: 'lunch'
    },
    {
      id: '7',
      heading: 'food 7',
      desc: 'this is one of the best food available',
      category: 'deserts'
    },
    {
      id: '7',
      heading: 'food 4',
      desc: 'this is one of the best food available',
      category: 'coffee'
    }];

  res.json({
    message: 'good',
    contents: contents
  });
});

app.post('/contents', (req, res, next) => {
  const contents = req.body;
  console.log(contents);
  res.status(200).json({
    message: "good"
  });
});


module.exports = app;
