import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";

interface Props {
  deleteContact: (id: number) => void;
}
const DeleteContactPage = ({ deleteContact }: Props) => {
  const history = useHistory();

  // Dissecting the URL
  const location = useLocation();
  const fullPath = location.pathname;
  const idString = fullPath.substring(fullPath.lastIndexOf("/") + 1);
  const id = parseInt(idString, 10);

  return (
    <div
      className="delete-page main"
      style={{
        marginTop: "100px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h2>Do you want to delete for sure?</h2>
      <div>
        <button
          className="ui button red"
          onClick={() => {
            deleteContact(id);
            history.push("/");
          }}
        >
          Yes
        </button>
        <Link to="/">
          <button className="ui button blue">No</button>
        </Link>
      </div>
    </div>
  );
};

export default DeleteContactPage;
