import React from 'react'
import Earth from './Earth'

const axios = require('axios')

export default class Home extends React.Component{

    // Initialize the state
    constructor(props){
        super(props);
        this.state = {
            origin: {
                geometry:{ lat: 0, lng: 0 }, name: ''},
            destinations: [
                    { geometry:{lat: 0, lng: 0}, name: '', price: 0},
                    { geometry:{lat: 0, lng: 0}, name: '', price: 0}
                ]
            }
        this.searchValue = ''
        this.searchPriceLimit = 0
        this.flightData = []
    }

    // Fetch the list on first mount
    componentDidMount() {
        // this.getLocation();
    }

    // Retrieves the location data from the Express app
    // getOriginLocation = () => {
    //     axios.get('/api/getLocation', {params: {
    //         location: this.searchValue
    //       }})
    //     .then(res => {
    //         this.setState({
    //             showEarth: true,
    //             origin: {
    //                 name: this.searchValue,
    //                 geometry: res.data.geometry
    //             }
    //         })
    //     })
    // }

    // // Retrieves the location data from the Express app
    // getFlightGeometries = (city) => {
    //     axios.get('/api/getLocation', {params: {
    //         location: city
    //       }})
        // .then(res => {
        //     this.setState({
        //         showEarth: true,
        //         origin: {
        //             name: this.searchValue,
        //             geometry: res.data.geometry
        //         }
        //     })
        // })
    // }

    // Retrieves the location data from the Express app
    getFlightData = async () => {
        let {data} = await axios.get('/api/destinations', {params: { location: this.searchValue, priceLimit: this.searchPriceLimit}})
        for(const flight of data){
            let {data} = await axios.get('/api/getLocation', {params: { location: flight.Destination}})
            this.flightData.push({
                name: flight.Destination, 
                price: flight.Price,
                geometry: data.geometry
            })
        }
        console.log(this.flightData)
        this.setState({
            destinations: this.flightData
        })
        console.log(this.state)
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
            <input onChange={this.handleOriginChange}
                type="text" 
                placeholder="Enter Origin"></input>
            <input onChange={this.handlePriceLimitChange}
                type="number" 
                min="10"
                placeholder="Enter Price Limit"></input>
            <button onClick={this.handleSubmit}>Submit</button>
            <Earth origin={origin} destinations={destinations}></Earth>
          </section>
        );
    }
}
