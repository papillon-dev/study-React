import React, { Component } from 'react';
import {render} from 'react-dom';

class Hello extends Component {
  render(){
    return (
      <h1>Hello World</h1>
    );
  }
}

class GroceryList extends Component {
  render() {
    return (
      <ul>
        <ListItem quantity="1" name="Bread" />
        <ListItem quantity="2" name="Eggs"/>
        <ListItem quantity="3" name="Milk"/>
      </ul>
    )
  }
}

class ListItem extends Component {
  render() {
    return (
      <li>
        {this.props.quantity}X {this.props.name}
      </li>
    )
  }
}

render(<GroceryList />, document.getElementById('root'));
