import React from 'react'
const axios = require('axios')

export default class Home extends React.Component{

    // Initialize the state
    constructor(props){
        super(props);
        this.state = {
            cityOrigin: '',
            cityDestination: '',
            }
    }

    // Fetch the list on first mount
    componentDidMount() {
        // this.getLocation();
    }

    // // Retrieves the list of items from the Express app
    getLocation = () => {
        axios.get('/api/getLocation', {params: {
            location: this.state.cityOrigin
          }})
        .then(data => console.log(data))
    }

    handleSubmit = (event) => {
        this.getLocation()
    }

    handleOriginChange = (event) => {
        let city = event.target.value
        this.setState({
            cityOrigin: city
        })
    }

    render() {

        let origin = this.state.cityOrigin

        return (
          <section>
            <h1>he</h1>
            <input onChange={this.handleOriginChange}
                type="text" 
                value={origin}
                placeholder="Enter Origin"></input>
            <button onClick={this.handleSubmit}>Submit</button>
          </section>
        );
    }
}
