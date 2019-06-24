const express = require('express')
const app = express()
const port = 8080;
const dotenv = require('dotenv')
const {getLocationData} = require('./controllers/locationCtrl')
dotenv.config()

app.listen(port, () =>{
    console.log(`listening on ${port}`)
})

// Serve the static files from the React app
app.use(express.static('client/build'));

// An api endpoint that returns a short list of items
app.get('/api/getLocation', (req,res) => {
    let city = "london"
    getLocationData(city)
        .then(
            (data) => {
                res.json(data)
            }
        )
});
