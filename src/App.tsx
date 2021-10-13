import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import api from "./api/contacts";

import Header from "./components/Header";
import AddContact from "./components/AddContact";
import ContactList from "./components/ContactList";
import { Contact } from "./components/model";
import ContactDetails from "./components/ContactDetails";
import DeleteContactPage from "./components/DeleteContactPage";
import EditContactPage from "./components/EditContactPage";

const App: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  // DELETE CONTACT
  const deleteContact = (id: number) => {
    api.delete<Contact>(`/contacts/${id}`).then(() => {
      setContacts(contacts.filter((contact) => id !== contact.id));
    });
  };

  // EDIT (update) CONTACT
  const updateContact = (id: number, updatedData: Contact) => {
    api.put(`/contacts/${id}`, updatedData).then((response) => {
      // put response .data inside the old contacts list
      // 1. access list
      // 2. fetch the conact with matching id and change its value
      // 3. put it in the list

      if (response.data) {
        const { name, email, id }: any = response.data;
        setContacts(
          contacts.map((contact) => {
            return contact.id === id ? { name, email, id } : contact;
          })
        );
      }
    });
  };

  // FETCH CONTACTS  (on every page refresh)
  useEffect(() => {
    api.get<Contact[]>("/contacts").then((response) => {
      const recievedContacts: Contact[] = response.data;

      // update the state
      if (recievedContacts) {
        // to prevent null values
        setContacts(recievedContacts);
      }
    });
  }, []);

  // // local storage (STORE ITEM)
  // const STORAGE_KEY = "contacts_list";
  // useEffect(() => {
  //   localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  // }, [contacts]);

  // component
  return (
    <div className="ui container">
      <Router>
        <Header />
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => (
              <ContactList
                {...props}
                contacts={contacts}
                deleteContact={deleteContact}
              />
            )}
          />
          <Route
            path="/add"
            render={(props) => (
              <AddContact
                {...props}
                contacts={contacts}
                setContacts={setContacts}
              />
            )}
          />
          <Route path="/contact/:id" component={ContactDetails} />
          <Route
            path="/delete/:id"
            render={(props) => (
              <DeleteContactPage {...props} deleteContact={deleteContact} />
            )}
          />
          <Route
            path="/edit/:id"
            render={(props) => (
              <EditContactPage
                {...props}
                updateContact={updateContact}
                contacts={contacts}
              />
            )}
          />
        </Switch>
      </Router>
    </div>
  );
};

export default App;

// TODO :
// 1. Create a new EDIT page and hook it with a button
// 2. Perform UPDATE on the existing contact using AXIOS
