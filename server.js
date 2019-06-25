const express = require('express')
const app = express()
const port = 8080;
const dotenv = require('dotenv')
const {getLocationData} = require('./controllers/locationCtrl')
const {getFlightData, getPlacesID} = require('./controllers/flightsCtrl')
dotenv.config()

app.listen(port, () =>{
    console.log(`listening on ${port}`)
})

// Serve the static files from the React app
app.use(express.static('client/build'));

// An api endpoint that returns a short list of items
app.get('/api/getLocation', (req,res) => {
    let city = req.query.location
    getLocationData(city)
        .then((data) => {res.json(data)})
});






// An api endpoint that returns a short list of items
app.get('/api/getFlight', (req,res) => {
    // let city = req.query.location
    getFlightData()
        .then((data) => {res.json(data)})
});

// An api endpoint that returns a short list of items
app.get('/api/getPlacesID', (req,res) => {
    // let city = req.query.location
    getPlacesID()
        .then((data) => {res.json(data)})
});





//// Plan of attack
// user inputs the origin city
//  ||
//  ||
// pass the origin city name string to getPlacesID
//  ||
//  ||
// return the skyscanner places ID
//  ||
//  ||
// use this ID to then check for flight data, with destination anywhere
//  ||
//  ||
// sort through the data until you get to a price limit
//  ||
//  ||
// use the response 'PlaceName' to get the location geometry data
//  ||
//  ||
// plot onto sphere

