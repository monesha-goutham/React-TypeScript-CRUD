import React, { useState } from "react";
import { Contact } from "./model";
import { useLocation, useHistory } from "react-router-dom";

interface Props {
  updateContact: (id: number, updatedData: Contact) => void;
  contacts: Contact[];
}

const EditContactPage: React.FC<Props> = ({ contacts, updateContact }) => {
  // setting history
  const history = useHistory();
  // getting the contact by filtering using the ID
  const location = useLocation();
  const fullPath = location.pathname;
  const idString = fullPath.substring(fullPath.lastIndexOf("/") + 1);
  const id = parseInt(idString, 10);

  let currentContact: Contact;
  [currentContact] = contacts.filter((contact) => contact.id === id);
  //   console.log(currentContact);

  // setting local states
  const [currentName, setCurrentName] = useState(currentContact.name);
  const [currentEmail, setCurrentEmail] = useState(currentContact.email);

  return (
    <div className="ui main" style={{ marginTop: "50px" }}>
      <h2>Edit Contact</h2>
      <form
        className="ui form"
        onSubmit={(e) => {
          e.preventDefault();
          const updatedContact: Contact = {
            name: currentName,
            email: currentEmail,
            id: id,
          };
          updateContact(currentContact.id, updatedContact);
          //   programatic navigation
          history.push("/");
        }}
      >
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="name"
            value={currentName}
            required
            onChange={(e) => {
              setCurrentName(e.target.value);
            }}
          />
        </div>
        <div className="field">
          <label>e-mail</label>
          <input
            type="text"
            name="email"
            placeholder="email"
            value={currentEmail}
            required
            onChange={(e) => {
              setCurrentEmail(e.target.value);
            }}
          />
        </div>

        <button className="ui button blue" type="submit">
          UPDATE
        </button>
      </form>
    </div>
  );
};

export default EditContactPage;
