const express = require('express')
const mongoose = require('mongoose')
const articleRouter = require('./routes/articles')
const app = express()

mongoose.connect('mongodb://127.0.0.1/blog', {
  usenewUrlParser: true,
  useUnifiedTopology: true,
})

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false })) // option
// access all the different parameter in article form inside the article route, eg. req.body.markdown

app.get('/', (req, res) => {
  const articles = [
    {
      title: 'test Article',
      createdAt: new Date(),
      description: 'Test description',
    },
    {
      title: 'test Article 2',
      createdAt: new Date(),
      description: 'Test description 2',
    },
  ]

  res.render('articles/index', { articles: articles })
  // pass articles to the view  views/articles/index.ejs
})
app.use('/articles', articleRouter)

app.listen(5000)
