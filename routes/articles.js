const express = require('express')
const Article = require('./../models/article') // use db model schema
const router = express.Router()

router.get('/new', (req, res) => {
  res.render('articles/new', { article: new Article() })
  // on server render,  /articles/new
  // pass in blank default article
})

router.get('/:id', (req, res) => {
  res.send(req.params.id)
})

// /articles/
router.post('/', async (req, res) => {
  //create new article/blog
  // in order to acess different options in the post req, server.js  app.use(express.urlencoded({extended: false}))
  let article = new Article({
    title: req.body.title,
    description: req.body.title,
    markdown: req.body.markdown,
  })

  try {
    article = await article.save()
    // async, update article = , this will gave us an id of the article by mongodb, in blog  db articles collection
    res.redirect(`/articles/${article.id}`)
    //  route created above
  } catch (e) {
    // if title or markdown is not specified
    console.log(e)
    res.render('articles/new', { article: article })
    // prefill the form  in /_form_fields
  }
})

module.exports = router
