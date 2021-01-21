const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  body: String,
  blogId: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog' },
});

commentSchema.set('toJSON', {
  transform(document, returnedObj) {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});

module.exports = mongoose.model('Comment', commentSchema);
