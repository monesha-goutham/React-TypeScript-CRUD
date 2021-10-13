import React, { useState } from "react";
import { Contact } from "./model";
import { useHistory } from "react-router-dom";
import api from "../api/contacts";

type Props = {
  contacts: Contact[];
  setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
};
const AddContact: React.FC<Props> = ({ contacts, setContacts }) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const history = useHistory();

  //   functions
  const submitContact = () => {
    const contactData: Contact = {
      name: name,
      email: email,
      id: Date.now(),
    };
    api.post<Contact>("/contacts", contactData).then((response) => {
      const addedContact: Contact = response.data;

      if (addedContact) {
        setContacts([...contacts, addedContact]);
      }
    });

    // NOTE : clearing local states ensure prevention of MEMORY LEAK warning related to useEffect
    setName("");
    setEmail("");
    // programatically REDIRECT to home
    history.push("/");
  };
  return (
    <div className="ui main">
      <h2>Add Contact</h2>
      <form
        className="ui form"
        onSubmit={(e) => {
          e.preventDefault();

          if (name && email) {
            //   prevents empty form submission
            submitContact();
          }
        }}
      >
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </div>
        <div className="field">
          <label>e-mail</label>
          <input
            type="text"
            name="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>
        <button className="ui button blue" type="submit">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddContact;
