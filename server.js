const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const { post } = require('got')
const pgp = require('pg-promise')()


const PORT = 3003
const CONNECTION_STRING = "postgres://xxvxdizkyfahlb:892a18d7a946c9f4b8556f463889889b026549b67a0ee25e7744b98f974d3aab@ec2-34-202-54-225.compute-1.amazonaws.com:5432/d1q9s7p8194avv"





app.engine('mustache',mustacheExpress())
app.set('views','./views')
app.set('view engine','mustache')


app.use(bodyParser.urlencoded({extended: false}))

const db = pgp(CONNECTION_STRING)



app.get('/',(req,res)=> {

        db.any('SELECT articleid, title,body FROM articles')
        .then((articles) => {

            res.render('index',{articles: articles})

            

        })

})

app.post('/delete-article',(req,res) => {

    let blogid = req.body.articleid

db.none('DELETE FROM articles WHERE articleid = $1', [blogid])

.then(() => {

    res.redirect('/') 

    })
}) 

app.post('/update-article',(req,res) => {
        
    let title = req.body.title
    let description = req.body.description
    let articleid = req.body.articleid
    
        db.none('UPDATE articles SET title = $1, body = $2 WHERE articleid = $3',[title,description,articleid] )
    .then(() => {

        res.redirect('/')
    })
})

app.get('/edit/:articleid',(req,res) => {

        let articleid = req.params.articleid

    db.one('SELECT articleid,title,body FROM articles WHERE articleid = $1',[articleid])

   .then((article) => {

        res.render('edit-article',article)

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
