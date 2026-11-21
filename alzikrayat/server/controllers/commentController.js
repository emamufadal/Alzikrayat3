const Photo = require('../models/Photo');
const Comment = require('../models/Comment');

// GET /api/photos/:id/comments
exports.getForPhoto = async (req, res, next) => {
  try {
    const comments = await Comment.find({ photoId: req.params.id })
      .sort({ dateTime: 1 })
      .populate('userId', 'firstName lastName');
    res.json(comments);
  } catch (err) {
    next(err);
  }
};

// POST /api/photos/:id/comments
exports.create = async (req, res, next) => {
  try {
    const photo = await Photo.findById(req.params.id);
    if (!photo) {
      return res.status(404).json({ message: 'Photo not found' });
    }

    const comment = await Comment.create({
      photoId: photo._id,
      userId: req.user._id,
      comment: req.body.comment,
    });

    await comment.populate('userId', 'firstName lastName');
    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
};
