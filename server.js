const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()

mongoose.connect('mongodb://127.0.0.1/blog', {
  usenewUrlParser: true,
  useUnifiedTopology: true,
})

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false })) // option
// access all the different parameter in article form inside the article route, eg. req.body.markdown

app.use(methodOverride('_method'))
// used in index.ejs delete button

app.get('/', async (req, res) => {
  // const articles = [
  //   {
  //     title: 'test Article',
  //     createdAt: new Date(),
  //     description: 'Test description',
  //   },
  //   {
  //     title: 'test Article 2',
  //     createdAt: new Date(),
  //     description: 'Test description 2',
  //   }
  // ]

  const articles = await Article.find().sort({ createdAt: 'desc' })
  // give every single article
  // time descending order

  res.render('articles/index', { articles: articles })
  // pass articles to the view  views/articles/index.ejs
})

app.use('/articles', articleRouter)

app.listen(5000)
