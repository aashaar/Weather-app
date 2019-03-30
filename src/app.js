const path = require('path')
const express = require('express')
const app = express()

//console.log(__dirname)
//console.log(path.join(__dirname,'../public'))

const publicDirectoryPath = path.join(__dirname,'../public')

//to set default template engine:
app.set('view engine', 'hbs')

//for home page:html
app.use(express.static(publicDirectoryPath))

//for home page:
app.get('',(req, res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Aashaar'
    })
})


//for About page:
app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Aashaar'
    })
})

//for Help page:
app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        message: 'This is the Help page'
    })
})


//for weather page:json
app.get('/weather',(req,res)=>{
    res.send({
        location: 'Dallas',
        forcast: 'It is 17 degrees Celsius'
    })
})

//to start the server.
app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})
