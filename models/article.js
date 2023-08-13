const mongoose = require('mongoose')
const marked = require('marked')
const slugify = require('slugify')

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
  slug: {
    type: String,
    required: true,
    unique: true, // slug need to be unique and validated
  },
})

// run this function, before we do valiadation on the article, each time we save, update, create, delete
articleSchema.pre('validate', function (next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true }) //if theres a ; in title, remove it
  }

  next()
})

module.exports = mongoose.model('Article', articleSchema)
//in blog db, we create Article table with all these columns,
