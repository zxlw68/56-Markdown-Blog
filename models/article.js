const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  markdown: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    // default: () => Date.now()
  },
})

module.exports = mongoose.model('Article', articleSchema)
