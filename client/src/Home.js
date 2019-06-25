import React from 'react'
import Earth from './Earth'
const axios = require('axios')

export default class Home extends React.Component{

    // Initialize the state
    constructor(props){
        super(props);
        this.state = {
            origin: {
                geometry:{
                    lat: 0,
                    lng: 0
                },
                name: ''
            },
            destinations: [
                    { geometry:{lat: -37.814, lng: 144.96332}, name: 'melbourne'},
                    { geometry:{lat: -36.848461, lng: 174.763336}, name: 'auckland'}
                ]
            }
        
        this.searchValue = ''
    }

    // Fetch the list on first mount
    componentDidMount() {
        // this.getLocation();
    }

    // Retrieves the location data from the Express app
    getOriginLocation = () => {
        axios.get('/api/getLocation', {params: {
            location: this.searchValue
          }})
        .then(res => {
            this.setState({
                showEarth: true,
                origin: {
                    name: this.searchValue,
                    geometry: res.data.geometry
                }
            })
        })
    }

    handleSubmit = (event) => {
        this.getOriginLocation()
    }

    handleOriginChange = (event) => {
        let city = event.target.value
        this.searchValue = city
    }

    render() {

        let origin = this.state.origin
        let destinations = this.state.destinations

        return (
          <section>
            <input onChange={this.handleOriginChange}
                type="text" 
                placeholder="Enter Origin"></input>
            <button onClick={this.handleSubmit}>Submit</button>
            <Earth origin={origin} destinations={destinations}></Earth>
          </section>
        );
    }
}
