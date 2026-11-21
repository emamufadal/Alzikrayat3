const express = require('express');
const photoController = require('../controllers/photoController');
const commentRoutes = require('./commentRoutes');
const requireUser = require('../middleware/requireUser');
const upload = require('../middleware/upload');
const { validate, photoSchema } = require('../middleware/validation');

const router = express.Router();

router.get('/', photoController.getAll);
router.get('/:id', photoController.getOne);
router.post('/', requireUser, upload.single('photo'), validate(photoSchema), photoController.create);
router.delete('/:id', requireUser, photoController.remove);

// /api/photos/:id/comments
router.use('/:id/comments', commentRoutes);

module.exports = router;
