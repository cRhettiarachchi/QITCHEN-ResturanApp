const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const checkFile = require('../middleware/multerFile');
const ControllerContents = require('../controllers/contents');

router.get('', ControllerContents.getAllContents);

router.post('', checkAuth, checkFile, ControllerContents.createContent);

router.delete('/:id', checkAuth, ControllerContents.deleteContent);

router.patch('/:id', checkAuth, checkFile, ControllerContents.updateContent); // end of update method

router.get('/:id', ControllerContents.singleContent);

router.get('/single/:type', ControllerContents.categoryContent);

module.exports = router;
