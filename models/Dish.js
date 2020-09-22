const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DishSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'category',
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  logo: {
    type: String,
  },
  composition: {
    type: [String],
  },
  description: {
    type: String,
  },
  visibile: {
    type: Boolean,
    default: true,
  },
});

module.exports = Dish = mongoose.model('dish', DishSchema);
