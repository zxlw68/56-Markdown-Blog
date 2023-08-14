const mongoose = require('mongoose')
const marked = require('marked')
const slugify = require('slugify')
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)

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
  sanitizedHtml: {
    type: String,
    required: true,
  },
})

// run this function, before we do valiadation on the article, each time we save, update, create, delete
articleSchema.pre('validate', function (next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true }) //if theres a ; in title, remove it
  }

  if (this.markdown) {
    this.sanitizedHtml = dompurify.sanitize(marked.parse(this.markdown))
  } //   articles/show.ejs  convert markdown to html, then purify it to get rid of malicious code, to skip any html characters

  next()
})

module.exports = mongoose.model('Article', articleSchema)
//in blog db, we create Article table with all these columns,
