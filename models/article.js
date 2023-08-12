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
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    // default: () => Date.now()
  },
})

module.exports = mongoose.model('Article', articleSchema)
//in blog db, we create Article table with all these columns,
