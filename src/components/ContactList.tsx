import React from "react";
import { Link } from "react-router-dom";

import ContactCard from "./ContactCard";
import { Contact } from "./model";

type Props = {
  contacts: Contact[];
  deleteContact: (id: number) => void;
};

const ContactList: React.FC<Props> = ({ contacts, deleteContact }) => {
  return (
    <div className="main" style={{ marginTop: "50px" }}>
      <h2>Contact List</h2>
      <Link to="/add">
        <button className="ui button blue right">Add Contacts</button>
      </Link>

      <div className="ui celled list">
        {contacts.map((contact) => (
          <ContactCard
            contact={contact}
            key={contact.id}
            deleteContact={deleteContact}
          />
        ))}
      </div>
    </div>
  );
};

export default ContactList;
