const express = require('express');
const commentController = require('../controllers/commentController');
const requireUser = require('../middleware/requireUser');
const { validate, commentSchema } = require('../middleware/validation');

// mergeParams lets us read :id from the parent photo route
const router = express.Router({ mergeParams: true });

router.get('/', commentController.getForPhoto);
router.post('/', requireUser, validate(commentSchema), commentController.create);

module.exports = router;
