const express = require('express')
const Article = require('./../models/article') // use db model schema
const router = express.Router()

router.get('/new', (req, res) => {
  res.render('articles/new')
  // on server render
})

router.get('/:id', (req, res) => {})

// /articles/
router.post('/', async (req, res) => {
  //create new article/blog
  // in order to acess different options in the post req, server.js  app.use(express.urlencoded({extended: false}))
  const article = new Article({
    title: req.body.title,
    descriptiion: req.body.title,
    markdown: req.body.title,
  })

  try {
    await article.save() // async
  } catch (e) {
    res.redirect(`/articles/${article.id}`)
    res.render('articles/new', { article: article })
  }
})

module.exports = router
