import React from "react";
import { Contact } from "./model";
import { Link } from "react-router-dom";

interface Props {
  contact: Contact;
  deleteContact: (id: number) => void;
}
const ContactCard: React.FC<Props> = ({ contact, deleteContact }) => {
  return (
    <div className="item">
      <div className="content">
        <Link
          to={{
            pathname: `/contact/${contact.id}`,
            state: { contact: contact },
          }}
        >
          <div className="header">{contact.name}</div>
          <div>{contact.email}</div>
        </Link>
      </div>
      <Link
        to={{
          pathname: `/delete/${contact.id}`,
        }}
      >
        {/* problem with state? */}
        <i className="trash alternate outline icon"></i>
      </Link>
      <Link
        to={{
          pathname: `/edit/${contact.id}`,
        }}
      >
        {/* problem with state? */}
        <i className="edit alternate outline icon"></i>
      </Link>
    </div>
  );
};

export default ContactCard;
