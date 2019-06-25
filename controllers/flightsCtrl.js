const dotenv = require('dotenv')
const axios = require('axios')
dotenv.config()

// API URL Builder
function browseQuotesUrl(originID, destinationID) {
    let baseUrl = `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0`
    return `${baseUrl}/AU/AUD/en-US/${originID}/${destinationID}/2019-09-01?inboundpartialdate=2019-12-01`

}

// API URL Builder
function listPlacesUrl(city) {
    let baseUrl = `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/GBP/en-GB`
    return `${baseUrl}/?query=${city}`
}


// Returns Flight Data
async function getFlightData(originID, destinationID){
    console.log(`Starting Search for Flight Data`)
    var {data} = await axios.get(browseQuotesUrl(originID, destinationID),{
        headers : {
            "X-RapidAPI-Host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
            "X-RapidAPI-Key": `${process.env.SKYSCANNER_API_KEY}`
          }
    })
    return data
}

// Returns Location Data for city
async function getPlacesID(city){
    console.log(`Starting Search for Places ID`)
    var {data} = await axios.get(listPlacesUrl(city),{
        headers : {
            "X-RapidAPI-Host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
            "X-RapidAPI-Key": `${process.env.SKYSCANNER_API_KEY}`
          }
    })
    // example data { PlaceId: 'MELA-sky', PlaceName: 'Melbourne', CountryId: 'AU-sky', RegionId: '', CityId: 'MELA-sky', CountryName: 'Australia' }
    return data.Places[0]
}

module.exports = {
    "getFlightData": getFlightData,
    "getPlacesID": getPlacesID
}
