const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//Define path for express
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath) //Either use a folder named views or set the path by this method
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Richu Jain Pulimoottil'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Richu'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Dont you worry when I am here to help you',
        name: 'Richu Jain'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide a search term.'
        })
    }
    //-----------------
    geoCode(req.query.address , (error, { latitude, longitude, location } = {} ) => { //={} default function parameters
        if(error){
            return res.send({error}) //return stops the function
        } 
    
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
    
            //code that works when both the functions work
            
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    //------------
    
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term.'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found.',
        name: 'Richu Jain'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found.',
        name: 'Richu Jain'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})