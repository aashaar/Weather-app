const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()

//console.log(__dirname)
//console.log(path.join(__dirname,'../public'))

//Define paths for Express config:
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//to set default template engine in handlebars:
app.set('view engine', 'hbs')

//to set path to 'views' folder which was renamed to 'templates' (for handlebars)
app.set('views',viewsPath)

//provide partials folder path to handlebars:
hbs.registerPartials(partialsPath)

//for home page:setup static directory to serve
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
        message: 'This is the Help page',
        name: 'Aashaar'
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
