const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const pgp = require('pg-promise')()
const path = require('path')

const PORT = 3003
const CONNECTION_STRING = "postgres://localhost:5432/blogdata"


const VIEWS_PATH = path.join(__dirname,'/views')


app.engine('mustache',mustacheExpress(VIEWS_PATH + '/partials','.mustache'))
app.set('views',VIEWS_PATH)
app.set('view engine','mustache')


app.use(bodyParser.urlencoded({extended: false}))

const db = pgp(CONNECTION_STRING)

app.get('/',(req,res)=> {

        db.any('SELECT articleid, title,body FROM articles')
        .then((articles) => {

            res.render('index',{articles: articles})

        })

})


app.get('/add-article',(req,res) => {
  res.render('add-article')
})

app.post('/add-article',(req,res) => {

  let title = req.body.title
  let description = req.body.description
 

  db.none('INSERT INTO articles(title,body) VALUES($1,$2)',[title,description])
  .then(() => {
    res.redirect('/')
  })

})



app.listen(PORT,() => {
  console.log(`Server has started on ${PORT}`)
})
