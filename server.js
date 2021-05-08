const express = require("express")

const articleRouter = require("./routes/articles")

const app = express()

app.set('view engine', 'ejs')



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