import React , {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';

export default class ContactList extends Component {
  render(){
    console.log("this.props.children => ",this.props.children," : ",this.props.contacts)
    let filteredContacts = this.props.contacts.filter(
      (listItem) => {listItem.name.indexOf(this.props.filterText) !== -1});
console.log(filteredContacts);
    return (
      <ul className="list-group">
        {filteredContacts.map(
          (contact) => <ContactItem key={contact.email}
                            name = {contact.name}
                            email = {contact.email} />
        )}
      </ul>
    )
  }
}

ContactList.PropTypes = {
    contacts : PropTypes.arrayOf(PropTypes.object)
}

class ContactItem extends Component {
  render(){
    return <li type="button" className="list-group-item">{this.props.name} - {this.props.email}</li>
  }
}

ContactItem.PropTypes = {
    name : PropTypes.string.isRequired,
    email : PropTypes.string.isRequired
}
