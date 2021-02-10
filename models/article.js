const mongoose = require('mongoose');
const validator = require('validator');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v, { protocols: ['http', 'https'] }),
      message: 'You must provide a valid URL for the article link.',
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v, { protocols: ['http', 'https'] }),
      message: 'You must provide a valid URL for the article image.',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    select: false,
  },
}, { versionKey: false });

module.exports = mongoose.model('article', articleSchema);
