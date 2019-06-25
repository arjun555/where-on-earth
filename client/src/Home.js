import React from 'react'
const axios = require('axios')

export default class Home extends React.Component{

    // Initialize the state
    constructor(props){
        super(props);
        this.state = {
            data: []
            }
    }

    // Fetch the list on first mount
    componentDidMount() {
        this.getLocation();
    }

    // // Retrieves the list of items from the Express app
    getLocation = () => {
        axios.get('/api/getLocation')
        .then(data => console.log(data))
    }

    render() {
        return (
          <section>
            <h1>he</h1>
          </section>
        );
    }
}
