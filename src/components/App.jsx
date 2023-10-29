import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import css from './App.module.css';
import Contacts from './Contacts/Contacts';
import Form from './Form/Form';
import Filter from './Filter/Filter';

class App extends Component {
  state = {
    contacts: [
      { id: 'acfaa541-1ab2-408e-880d-60f3662b3a82', name: 'Rosie Simpson', number: '459-12-56' },
      { id: '19debbd4-0599-4530-b4e5-ab5e8779528c', name: 'Hermione Kline', number: '443-89-12' },
      { id: '89f583cc-6da1-4134-b41d-98f0fd9c8dcb', name: 'Eden Clements', number: '645-17-79' },
      { id: 'f68e6160-da93-4a85-9ed7-ba4977905d43', name: 'Annie Copeland', number: '227-91-26' },
      { id: '316707bd-2f8c-4043-ae5c-f7eee03d7e0f', name: 'Sophie Buckster', number: '449-17-21' },
      { id: 'e697cfac-eec5-4009-8def-4dec12ada822', name: 'Mark Shepard', number: '444-33-13' },
    ],
    filter: '',
  };

  addContact = ({ name, number }) => {
    let isAdded = this
      .state
      .contacts
      .findIndex(el => el.name.toLowerCase() === name.toLowerCase())

    if (isAdded >= 0) {
      alert(`${name} is already in contacts`);
      return;
    }
    const contact = {
      id: uuidv4(),
      name: name,
      number: number,
    };
    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
  };

  onFilterChange = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  showContacts = () => {
    const { filter, contacts } = this.state;

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  onDeleteContact = (id) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const showContacts = this.showContacts();

    return (
      <div className={css.container}>
        <h1>Phonebook</h1>
        <Form onSubmit={this.addContact} />

        <h2 className={css.titleContacts}>Contacts</h2>
        <div className={css.allContacts}>All contacts: {contacts.length}</div>
        <Filter value={filter} onChange={this.onFilterChange} />
        <Contacts
          contacts={showContacts}
          onDeleteContact={this.onDeleteContact}
        />
      </div>
    );
  }
}

export default App;
