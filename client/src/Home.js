import React from 'react'
import Earth from './Earth'
import './Home.css';

const axios = require('axios')

export default class Home extends React.Component{

    // Initialize the state
    constructor(props){
        super(props);
        this.state = {
            origin: {
                geometry:{ lat: 0, lng: 0 }, name: ''},
            destinations: []
            }
        this.searchValue = ''
        this.searchPriceLimit = 0
        this.flightData = []
        this.loadingFlightData = false;
    }

    // Fetch the list on first mount
    componentDidMount() {
        // this.getLocation();
    }

    // Retrieves the location data from the Express app
    getFlightData = async () => {
        this.loadingFlightData = true;
        let {data} = await axios.get('/api/destinations', {params: { location: this.searchValue, priceLimit: this.searchPriceLimit}})
        this.flightData = []
        for(const flight of data){
            let {data} = await axios.get('/api/getLocation', {params: { location: flight.Destination}})
            this.flightData.push({
                name: flight.Destination, 
                price: flight.Price,
                geometry: data.geometry
            })
        }
        this.setState({
            destinations: this.flightData
        })
        this.loadingFlightData = false;
    }



    handleSubmit = (event) => {
        if(this.searchValue && this.searchPriceLimit > 0){
            this.getFlightData()
        }
    }

    handleOriginChange = (event) => {
        let city = event.target.value
        this.searchValue = city
    }

    handlePriceLimitChange = (event) => {
        let price = event.target.value
        this.searchPriceLimit = price
    }

    render() {

        let origin = this.state.origin
        let destinations = this.state.destinations

        return (
          <section>
            <div className="container">
            <label>Where are you travelling from?</label>
            <input className="input-origin"
                onChange={this.handleOriginChange}
                type="text" 
                placeholder="Enter Origin"></input>
            <label>How much do you want to spend one-way?</label>
            <span>$</span><input className="input-price"
                onChange={this.handlePriceLimitChange}
                type="number" 
                min="10"
                placeholder="(AUD)"></input>
            <button onClick={this.handleSubmit}>Search</button>
            </div>
            <div>
                <Earth origin={origin} destinations={destinations}></Earth>
            </div>
            {/* <div>
                    {this.state.destinations.map((city, index) => 
                        <p key={city.name}>{city.name}</p>
                    )}
            </div> */}
          </section>
        );
    }
}
