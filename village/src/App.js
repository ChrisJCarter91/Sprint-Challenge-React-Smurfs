import React, { Component } from 'react';

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';
import axios from 'axios';
import { Route, NavLink } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.

  componentDidMount() {
    axios
      .get('http://localhost:3333/smurfs')
      .then(response => {
        this.setState({
          smurfs: response.data
        })
      })
      .catch(error => console.log(error));
  }

  createHandler = data => {
    axios 
      .post('http://localhost:3333/smurfs', data)
      .then(response => {
        this.setState({
          smurfs: response.data
        })
      })
      .catch(error => {
        console.log(error);
      })
  }

  render() {

    const NewBtn = () => {
      return (
        <NavLink to='/add'>Add</NavLink>
      );
    }

    const BackBtn = () => {
      return (
        <NavLink to='/'>Back</NavLink>
      )
    }

    return (
      <div className="App">
      <Route exact path='/add' component={BackBtn}  />
      <Route exact path='/add' render={props => <SmurfForm {...props} createHandler={this.createHandler} />} />
      <Route exact path='/' component={NewBtn}  />
      <Route path="/" render={props => <Smurfs {...props} smurfs={this.state.smurfs} /> }  />
      </div>
    );
  }
}

export default App;
