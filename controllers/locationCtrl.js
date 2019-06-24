const dotenv = require('dotenv')
const axios = require('axios')
dotenv.config()

// API URL Builder
function openCageUrl(placeName) {
    let baseUrl = `https://api.opencagedata.com/geocode/v1/json?`
    return `${baseUrl}q=${placeName}&key=${process.env.OPEN_CAGE_API_KEY}&language=en&pretty=1`
}

// Returns Location Data for city
async function getLocationData(city){
    console.log(`Searching for location: ${city}`)
    var {data} = await axios.get(openCageUrl(city))
    return data.results[0]
}

module.exports = {
    "getLocationData": getLocationData
}