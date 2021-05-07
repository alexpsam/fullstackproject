const express = require('express')

const router = express.Router()

router.get('/creat', (req, res) => {

    res.render('/articles/creat')

})
// router.post('/', (req,res) => {
    
// })

module.exports = router