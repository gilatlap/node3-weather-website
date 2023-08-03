const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast')


const app = express()
//Define paths for express config
const  publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//Setting handle bars engine and views location (to use non static files)
//documentations here: https://expressjs.com/en/4x/api.html#app.set
app.set('view engine', 'hbs') 
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//setting up the dynamic index page handle bar
app.get('', (req, res)=>{
    res.render('index', {
        title:'Weather',
        name:'Gilat Lapin'
    })
})


app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error:'you most provide a search term'
        })
    }
    console.log(req.query.search)

    res.send({
        products:[]
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title:'About me',
        name:'Gilat Lapin'
        })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title:'Help',
        helpText:'for help click here:',
        name:'Gilat Lapin'
        })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error:'No addree, please try again'
        })
    }
    
    console.log(req.query.address)
    geocode.geoCode(req.query.address, (error, {name, latitude, longitude}={})=>{
        if(error){
            return res.send({error})
        }
        forecast.forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            console.log('Data location\n', name)
            console.log('forecast Data:\n', forecastData)
            res.send({
                location:name,
                forecast:forecastData,
                address:req.query.address
            })
        })
    })

    
})

// * is a wildcard that match anything that hasne been handled before above
app.get('/help/*', (req,res)=>{
    res.render('error-page', {
        title:'404',
        errorMessage:'Help article not found',
        name:'Gilat Lapin'
    })
}) 
// * match anything that hasne been handled before above
app.get('*', (req,res)=>{
    res.render('error-page',{
        title:'404',
        errorMessage:'Page not found',
        name:'Gilat Lapin'
    })
})

//liseting on port 3000 to startup the app
app.listen(3000, ()=>{
    console.log('Server is up on port 3000')
})