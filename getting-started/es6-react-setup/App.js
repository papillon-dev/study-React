import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>I <Heart /> React!</h1>
      </div>
    );
  }
}

class Heart extends Component {
  render() {
    return (
      <span className="glyphicon glyphicon-heart"></span>
    );
  }
}

//const Heart = () => <span className="glyphicon glyphicon-heart"></span>

// define default properties
App.defaultProps = {
  txt: 'this is the default txt'
}

// A stateless function component// const variable "app"
// const variable "app" is going to be equal to a function that simply returns our JSX.
// const App = () => <h1>Howdy</h1>
