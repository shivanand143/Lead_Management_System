import React from "react";
import { Link } from "react-router-dom";
import API from "../api";

export default function LeadsActions({ data, refreshLeads }) {
  const handleDelete = async () => {
    if (window.confirm("Delete this lead?")) {
      try {
        await API.delete(`/leads/${data._id}`, { withCredentials: true });
        refreshLeads(); 
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div style={{ display: "flex", gap: "5px" }}>
      <Link to={`/${data._id}/edit`}>
        <button>Edit</button>
      </Link>
      <button style={{ background: "#e74c3c", color: "#fff" }} onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}

