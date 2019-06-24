const express = require('express')
const app = express()
const port = 8080;
const dotenv = require('dotenv')
const axios = require('axios')
dotenv.config()

app.listen(port, () =>{
    console.log(`listening on ${port}`)
})

// Serve the static files from the React app
app.use(express.static('client/build'));

// An api endpoint that returns a short list of items
app.get('/api/getLocation', (req,res) => {
    console.log(`Retrieving Location lat/lon...`)
    let location = {
        city: "london",
        coordinates: {lat: 0, lng: 0}
    }

    getLocation(location.city)
        .then(
            (res1) => {
                location.coordinates = res1.data.results[0].geometry
                console.log(res1.data.results[0].geometry)
                res.json(location)
            }
        )
        .catch(
            (err) => console.log(err)
        )
});


// get the lat and long of the specified place name
function openCageUrl(placeName) {
    let baseUrl = `https://api.opencagedata.com/geocode/v1/json?`
    return `${baseUrl}q=${placeName}&key=${process.env.OPEN_CAGE_API_KEY}&language=en&pretty=1`
}

function getLocation(city){
    return axios.get(openCageUrl(city))
}