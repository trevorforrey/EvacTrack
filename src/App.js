import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'; 
import MenuAppBar from './components/MenuAppBar';
import AuthenticatedHomePage from './components/HomePage';
import Profile from './components/Profile';
import Evacuate from './components/Evacuate'; 
import Family from './components/Family';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props); 

    this.state = {
      lat: null, 
      long: null,
      isAuthenticated: false,
    };

    this.authenticate = this.authenticate.bind(this); 
    this.signout = this.signout.bind(this); 
  }
      
  authenticate() {
    this.setState({isAuthenticated: true});
  }
  signout() {
    this.setState({isAuthenticated: false});
  }

  getLocation() {
    if ("geolocation" in navigator) {
      // check if geolocation is supported/enabled on current browser
      navigator.geolocation.getCurrentPosition(
       (position) => {
         // for when getting location is a success
         this.setState({lat:position.coords.latitude, long: position.coords.longitude});
       },
    
      function error(error_message) {
        // for when getting location results in an error
        console.error('An error has occured while retrieving location', error_message);
      }      
    );
    
    } else {
      // geolocation is not supported
      // get your location some other way
      console.log('geolocation is not enabled on this browser');
    }
  }

  render() {
    if (this.state.lat === null) {
      this.getLocation();
    }
    return (
      <div>
        <MenuAppBar auth={this.state.isAuthenticated} 
                    signin={this.authenticate} 
                    signout={this.signout} />
        <main> 
          <Switch>
              <Route exact path="/" component={AuthenticatedHomePage}/>
              <Route exact path="/profile" render={() => (
                this.state.isAuthenticated ? (
                  <Profile />
                ) : (
                  <Redirect to="/"/>
                )
              )}/>
              <Route exact path="/evacuate" render={() => (
                this.state.isAuthenticated ? (
                  <Evacuate />
                ) : (
                  <Redirect to="/"/>
                )
              )}/>
              <Route exact path="/family" render={() => (
                this.state.isAuthenticated ? (
                  <Family />
                ) : (
                  <Redirect to="/"/>
                )
              )}/>
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
