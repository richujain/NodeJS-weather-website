const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=6487b748a1bd42e5f5929a61e03f55e5&query='+ longitude +',' + latitude + '&units = m'
    request({ url, json: true }, (error, {body}) => {
        if(error){
            callback('Unable to connect to location services!', undefined)
        } else if(body.error){
            callback('Unable to find the location', undefined)
        }
        else{
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature +
                  ' degrees out. It feels like ' + body.current.feelslike + ' degrees out')
        }
    })
}

module.exports = forecast