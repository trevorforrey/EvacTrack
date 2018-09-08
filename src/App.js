import React from 'react';
import { Switch, Route, Link } from 'react-router-dom'; 
import MenuAppBar from './components/MenuAppBar';
import HomePage from './components/HomePage';
import './App.css';


const App = () => (
  <div>
    <MenuAppBar />
    <main> 
      <Switch>
          <Route exact path="/" component={HomePage}/>
      </Switch>
    </main>
  </div>
);

export default App;
