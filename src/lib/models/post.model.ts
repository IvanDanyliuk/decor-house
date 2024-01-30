import mongoose, { models } from 'mongoose';

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  publicationDate: { type: String, required: true },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  content: { type: String, required: true },
}, {
  timestamps: true
});

const Post = models.Post || mongoose.model('Post', postSchema);

export default Post;