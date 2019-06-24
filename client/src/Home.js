import React from 'react'

export default class Home extends React.Component{

    // Initialize the state
    constructor(props){
        super(props);
        this.state = {
            location: []
            }
    }

    // Fetch the list on first mount
    componentDidMount() {
        this.getLocation();
    }

    // Retrieves the list of items from the Express app
    getLocation = () => {
        fetch('/api/getLocation')
        .then(res => res.json())
        .then(location => this.setState({ location }))
    }

    render() {
        return (
          <section>
            <h1>Home</h1>
          </section>
        );
    }
}