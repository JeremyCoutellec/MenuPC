const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientSchema = new Schema({
  company: {
    type: Schema.Types.ObjectId,
    ref: 'company',
  },
  lastName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Client = mongoose.model('client', ClientSchema);
