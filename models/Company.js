const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  name: {
    type: String,
    required: true,
  },
  localisation: {
    type: String,
  },
  description: {
    type: String,
  },
  email: {
    type: String,
  },
  logo: {
    type: String,
  },
  website: {
    type: String,
  },
  social: {
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    instagram: {
      type: String,
    },
    tripadvisor: {
      type: String,
    },
  },
});

module.exports = Company = mongoose.model('company', CompanySchema);
