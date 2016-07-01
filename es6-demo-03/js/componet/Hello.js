import React , {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';

class Hello extends Component {
  render(){
    return(
      <h1>Hellow world</h1>
    )
  }
}

ReactDOM.render(< Hello /> ,  document.getElementById('root'))
