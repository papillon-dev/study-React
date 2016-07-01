import React , {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import ContactList from './componet/ContactList.js'

class ContactsApp extends Component {
  constructor(){
    super();
    this.state = {
      filterText : ""
    };
  }

handleInputEvent(text){

  this.setState = {
    filterText : text
  };
  console.log(this.state.filterText);
}


  render(){
    return(
      <div>
        <SearchBar filterText={this.state.filterText} onUserInput={this.handleInputEvent.bind(this)} />
        <ContactList filterText={this.state.filterText} contacts={this.props.contacts} />
      </div>
    )
  }
};

ContactsApp.PropTypes = {
  contacts : PropTypes.arrayOf(PropTypes.object)
};

class SearchBar extends Component {
eventChangeFun (event){
  this.props.onUserInput(event.target.value);
  console.log("searchbar val : ",event.target.value);
}

  render(){
    return (<input type="search" className="form-control" placeholder="search....."
                onChange={this.eventChangeFun.bind(this)}    />)
  }
};

let contacts = [
  { name :"Cassio Zen", email : "http://i1.daumcdn.net/svc/image/U03/sdb/56C52A63023A5B0002" },
  { name :"Dan Abramov", email : "http://i1.daumcdn.net/svc/image/U03/sdb/56C52A76023AFB0003" },
  { name :"Pete Hunt", email : "http://i1.daumcdn.net/svc/image/U03/sdb/56C52A810134DD0003" },
  { name :"Ryan Florence", email : "http://i1.daumcdn.net/svc/image/U03/sdb/56C52A8E0646960001" },
  { name :"윤중장", email : "http://i1.daumcdn.net/svc/image/U03/sdb/56C52AA3027C220002" },
  { name :"박병수", email : "http://i1.daumcdn.net/svc/image/U03/sdb/56C52AB10332B70001" }
];


ReactDOM.render(<ContactsApp contacts={contacts} />, document.getElementById('app') );
