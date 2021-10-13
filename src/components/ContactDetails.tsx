import React from "react";
import { Link } from "react-router-dom";

// These states were recieved as props via <LINK>
const ContactDetails = (props: any) => {
  const { name, email } = props.location.state.contact;
  return (
    <div
      className="contact-display"
      style={{ display: "flex", flexDirection: "column", marginTop: "50px" }}
    >
      <div className="content">
        <div>{name}</div>
        <div>{email}</div>
      </div>
      <Link to="/">
        <button className="ui button blue">Back to list</button>
      </Link>
    </div>
  );
};

export default ContactDetails;
