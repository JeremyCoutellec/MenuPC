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
  composition: {
    type: [String],
  },
  description: {
    type: String,
  },
});

module.exports = Dish = mongoose.model('dish', DishSchema);
