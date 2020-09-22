const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: Number,
    required: true,
  },
  logo: {
    type: String,
  },
  description: {
    type: String,
  },
});

module.exports = Category = mongoose.model('category', CategorySchema);
