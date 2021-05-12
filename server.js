const express = require("express")

const mustacheExpress = require('mustache-express')
const pgp = require('pg-promise')()
const CONNECTION_STRING = "postgres://localhost:5432/blogdata"


const articleRouter = require("./routes/articles")

const app = express()

app.engine('mustache',mustacheExpress())
app.set('views','./views')
app.set('view engine','mustache')


const db = pgp(CONNECTION_STRING)


app.post('/articles/new',(req,res) => {

    console.log(req.body);
    let title = req.body.title
    let description = req.body.description
   
  
   db.none('INSERT INTO articles(title,body) VALUES($1,$2)',[title,description])
    .then(() => {
      res.send("SUCCESS")
    })
  
  })


app.get('/', (req, res) => {
    const articles = [{
        title:'test article',
        createdAt: new Date(),
        description: 'Test description'
    },
    {
        title:'test article 2',
        createdAt:  new Date(),
        description: 'Test description'
    }
    
    ]

    res.render('articles/index', {articles: articles})
    
})
app.use( '/articles' , articleRouter)
//http://localhost:5000/ copy and paste this to go to the home page of the blog//
app.listen(5000)