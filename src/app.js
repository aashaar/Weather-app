const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

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
        name: 'Aashaar Panchalan'
    })
})


//for About page: will try to get /about page in views folder
app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Aashaar Panchalan'
    })
})

//for Help page: will try to get /help page in views folder
app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        message: 'This is the Help page',
        name: 'Aashaar Panchalan'
    })
})


//for weather page:json
app.get('/weather',(req,res)=>{
    //to check if address exists:
    if(!req.query.address)
    {
        return res.send({
            error: 'You must provide an address.'
        })
    }
    geocode(req.query.address,(error,{latitude, longitude, location}={})=>{
        if(error)
        {
           return res.send({
               error //short hand for error:error
           }) 
        }
        forecast(latitude,longitude,(error, forecastData)=>{
            if(error)
            {
                return res.send({
                    error //short hand for error:error
                })
            }
            res.send({
                location, //short hand for location:location
                forecast : forecastData,
                address : req.query.address

            })
        })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search)
    {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products:[]
    })
})

//for 404 page inside Help route:
app.get('/help/*',(req,res)=>{
    //res.send('Help article not found')
    res.render('404',{
        title: 'Error 404',
        errorMessage: 'Help article not found',
        name: 'Aashaar Panchalan'
    })
})

//for 404 page (this code has to be at the end, just before starting the server)
app.get('*',(req,res)=>{
    //res.send('My 404 page')
    res.render('404',{
        title: 'Error 404',
        errorMessage: 'Requested page not found',
        name: 'Aashaar Panchalan'
    })
})

//to start the server.
app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})
