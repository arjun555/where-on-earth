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
    getPlacesID('auckland')
        .then((data) => {res.json(data)})
});


app.get('/api/destinations', (req, res) => {
    console.log('made it fam')
    let origin = req.query.location
    let priceLimit = req.query.priceLimit
    getPlacesID(origin)
        .then((data) => {
            // returns the PlaceID for the given Origin city
            // res.json(data)
            getFlightData(data.PlaceId, 'anywhere')
            .then((flightData) => {
                // console.log(flightData)
                // Get array of Flight Data that is within the price limits
                getQuotesWithinLimit(flightData.Quotes, priceLimit)
                res.json(processQuotes(getQuotesWithinLimit(flightData.Quotes, priceLimit), flightData.Places))
            })
        })
})

// Applies the priceLimit to filter through the quote data returned from the API
function getQuotesWithinLimit(quoteData, priceLimit){
    let quotesWithinLimit = []
    quoteData.forEach((quote) => {
        if(quote.MinPrice <= priceLimit)
        {
            quotesWithinLimit.push(quote)
        }
    })
    console.log(`Here are the Quotes that are less than ${priceLimit}`)
    // console.log(quotesWithinLimit)
    return quotesWithinLimit;
}

// Takes an array of quotes and converts the DestinationID's (skyscanner's assignments) and returns an array with the Destinations as strings and flight price
function processQuotes(quotes, placeIds){
    let arr = []
    quotes.forEach((quote) => {
        let destinationID = quote.OutboundLeg.DestinationId
        let minPrice = quote.MinPrice
        for(let i = 0; i < placeIds.length; i++){
            if(placeIds[i].PlaceId == destinationID)
            {
                arr.push({Destination: placeIds[i].Name, Price: minPrice})
            }
        }
    })
    return arr
}


//// Plan of attack
// user inputs the origin city (Y)
//  ||
//  ||
// pass the origin city name string to getPlacesID (Y)
//  ||
//  ||
// return the skyscanner places ID (Y)
//  ||
//  ||
// use this ID to then check for flight data, with destination anywhere (Y)
//  ||
//  ||
// sort through the data until you get to a price limit (Y)
//  ||
//  ||
// use the response 'PlaceName' to get the location geometry data 
//  ||
//  ||
// plot onto sphere

