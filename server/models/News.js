import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
  section: String,
  tags: [String],
  createdDate: Date,
  itemTitle: String,
  itemText: String,
  body: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  submitter: String,
  updates: [Date],
  published: Boolean,
  publishedDate: Date,
  email: String,
}, {
  timestamps: true,
  collection: 'news'
});

const News = mongoose.model('News', newsSchema);
export default News;
