import React from 'react';
import Earth from './Earth'
import Home from './Home'
import { Switch, Route, BrowserRouter, Link } from 'react-router-dom'

class App extends React.Component {

  render(){
    return (
      <div className="App">
        <header>
          <h1>Where on Earth</h1>
        </header>
        <main>
          <Switch>
              <Route exact path="/" component={Home}/>
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
