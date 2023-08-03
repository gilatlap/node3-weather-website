const request = require('postman-request');



//json:true provide the response in json automaticly
const forecast =(latitude, longitude, callback)=>{
        const url = 'http://api.weatherstack.com/current?access_key=41b7895419d59f9c29f4857216d18035&query='+latitude+','+longitude

        request({url, json: true}, (error, {body})=>{
        if(error){
            callback('unable to connect to weather service', undefined)
        }else if(body.error){
            callback('unable to find location', undefined)
        }
        else{
            const {weather_descriptions, temperature, feelslike, precip} = body.current
            const data = weather_descriptions[0]+ ".\n"+"It is currently:"+temperature+" out. \nIt feels like: "+feelslike+" degrees out. \nThere is a "+ precip+ "% chance of rain"
            callback(undefined, data)
        }
    })
}

module.exports ={
    forecast:forecast
}