const request = require('request')

// Weather API
//Latitude & Longitude -> Weather data

const forecast = (longitude, latitude, callback)=>{
     const url = 'https://api.darksky.net/forecast/61d7ec40a1e19861177b94d1ef2ddad3/'+encodeURIComponent(longitude)+','+encodeURIComponent(latitude)+'?units=si'
     //request({url:url, json:true},(error, response)=>{ // destructuring response object & using short hand for url property
     request({url, json:true},(error, {body})=>{
         if(error)
         {
             callback('Unable to connect to weather service', undefined)
         }
         else if(body.error)
         {
            callback('Unable to find location with given coordinates',undefined)
         }
         else
         {
             const data = body.daily.data[0].summary + ' It is currently '+body.currently.temperature+' degrees(C) out. There is a '+body.currently.precipProbability+'% chance of rain'
             callback(undefined,data)
         }

     })
}

module.exports = forecast