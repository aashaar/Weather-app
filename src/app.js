const path = require('path')
const express = require('express')
const app = express()

//console.log(__dirname)
//console.log(path.join(__dirname,'../public'))

const publicDirectoryPath = path.join(__dirname,'../public')

//for home page:html
app.use(express.static(publicDirectoryPath))


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
