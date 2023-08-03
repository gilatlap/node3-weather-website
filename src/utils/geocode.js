const request = require('postman-request');

const geoCode= (address, callback)=>{
    
    const locatioiqKey = 'pk.78155e1145d9e3186e944a3aac873434'
    const url = 'https://us1.locationiq.com/v1/search?key='+locatioiqKey+'&q='+encodeURIComponent(address)+'&format=json&limit=1'

    request({url, json:true},(error, {body})=>{
        console.log('body.data', body, error, body.error)

        console.log(url)
        if(error || body.error){
            callback('unable to connect to location services: '+body.error.message, undefined)
        }
        else if(body.length === 0){
            callback('Unable to find Geo location ', undefined)
        }
        else{ 
            const {display_name, lat, lon} = body[0]
            callback(undefined, {
                name:display_name,    
                latitude:lat,
                longitude:lon
            })
           }
    })
}

module.exports = {
    geoCode:geoCode
}

