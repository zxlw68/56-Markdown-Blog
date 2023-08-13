const express = require('express')
const Article = require('./../models/article') // use db model schema
const { trusted } = require('mongoose')
const router = express.Router()

router.get('/new', (req, res) => {
  res.render('articles/new', { article: new Article() })
  // on server render,  /articles/new
  // pass in blank default article
})

// router.get('/:id', async (req, res) => {
//   const article = await Article.findById(req.params.id)
router.get('/:slug', async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug })
  // console.log(article)

  //find() returs array,  findOne({}) return single article.

  if (article == null) res.redirect('/')
  res.render('articles/show', { article: article })
  // res.send(req.params.id)
  // url params,  params[:id] is meant to be the string that uniquely identifies a (RESTful) resource
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
    // console.log(article.id)
    res.redirect(`/articles/${article.slug}`)
    //  route created above
  } catch (e) {
    // if title or markdown is not specified
    console.log(e)
    res.render('articles/new', { article: article })
    // prefill the form  in /_form_fields
  }
})

router.delete('/:id', async (req, res) => {
  await Article.findByIdAndDelete(req.params.id)
  res.redurect('/')
})

module.exports = router
