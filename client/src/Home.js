import React from 'react'
import Earth from './Earth'
const axios = require('axios')

export default class Home extends React.Component{

    // Initialize the state
    constructor(props){
        super(props);
        this.state = {
            showEarth: false,
            origin: {
                geometry:{
                    lat: 0,
                    lng: 0
                },
                name: 'London'
            },
            destinations: {
                    geometry:{
                        lat: 0,
                        lng: 0
                    },
                    name: 'London'
                }
            }
    }

    // Fetch the list on first mount
    componentDidMount() {
        // this.getLocation();
    }

    // // Retrieves the list of items from the Express app
    getLocation = () => {
        axios.get('/api/getLocation', {params: {
            location: this.state.origin.name
          }})
        .then(res => {
            this.setState({
                showEarth: true,
                origin: {
                    name: this.state.origin.name,
                    geometry: res.data.geometry
                }
            })
        })
    }

    handleSubmit = (event) => {
        this.getLocation()
    }

    handleOriginChange = (event) => {
        let city = event.target.value
        this.setState({
            origin: {
                name: city
            }
        })
    }

    render() {

        let origin = this.state.origin

        return (
          <section>
            <h1>he</h1>
            <input onChange={this.handleOriginChange}
                type="text" 
                value={origin.name || ''}
                placeholder="Enter Origin"></input>
            <button onClick={this.handleSubmit}>Submit</button>
            {(this.state.showEarth)?
                <Earth location={this.state}></Earth> :
                null
            }
          </section>
        );
    }
}
