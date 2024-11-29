const express = require('express')
const app = express()
const port = 3000
app.set("view engine", "ejs")

app.use(express.static(__dirname +'/public'))

const posts = [
    {title: 'Title 1', body: 'Body 1', img: 'image'},
    {title: 'Title 2', body: 'Body 2', img: 'image'},
    {title: 'Title 3', body: 'Body 3', img: 'image'},
    {title: 'Title 4', body: 'Body 4', img: 'image'},
    {title: 'Title 5', body: 'Body 5', img: 'image'},
    {title: 'Title 6', body: 'Body 6', img: 'image'},
    {title: 'Title 7', body: 'Body 7', img: 'image'},
    {title: 'Title 8', body: 'Body 8', img: 'image'},
]

app.get('/', (req,res) =>{
    res.render('index' , {
        posts: posts
    })
})
app.listen(port, ()=>{
    console.log('App listening at port ${port}')
})