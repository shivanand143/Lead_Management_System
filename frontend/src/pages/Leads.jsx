import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import API from "../api";
import { AuthContext } from "../context/AuthContext";

import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

export default function Leads() {
  const { user, logout } = useContext(AuthContext);
  const [leads, setLeads] = useState([]);

  const fetchLeads = async () => {
    try {
      const res = await API.get("/leads?page=1&limit=100", { withCredentials: true });
      setLeads(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const columnDefs = [
    { field: "first_name", headerName: "First Name" },
    { field: "last_name", headerName: "Last Name" },
    { field: "email", headerName: "Email" },
    { field: "phone", headerName: "Phone" },
    { field: "company", headerName: "Company" },
    { field: "city", headerName: "City" },
    { field: "state", headerName: "State" },
    { field: "status", headerName: "Status" },
    { field: "score", headerName: "Score" },
    { field: "lead_value", headerName: "Lead Value" },
    { field: "is_qualified", headerName: "Qualified", valueFormatter: params => params.value ? "Yes" : "No" },
    { field: "last_activity_at", headerName: "Last Activity", valueFormatter: params => params.value ? new Date(params.value).toLocaleDateString() : "-" },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: (params) => {
        return (
          <div style={{ display: "flex", gap: "5px" }}>
            <Link to={`/${params.data._id}/edit`}>
              <button>Edit</button>
            </Link>
            <button
              style={{ background: "#e74c3c", color: "#fff" }}
              onClick={async () => {
                if (window.confirm("Delete this lead?")) {
                  await API.delete(`/leads/${params.data._id}`, { withCredentials: true });
                  fetchLeads(); // refresh after delete
                }
              }}
            >
              Delete
            </button>
          </div>
        );
      }
    }
  ];

  return (
    <div style={{ padding: "20px" }}>
      {user && (
        <div style={{ marginBottom: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>Signed in as <b>{user.email}</b></div>
          <button onClick={logout}>Logout</button>
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
        <h2>Leads</h2>
        <Link to="/new"><button>New Lead</button></Link>
      </div>

      <div className="ag-theme-alpine" style={{ height: 600, width: "100%" }}>
       <div style={{ height: 600, width: "100%" }}>
  <AgGridReact
    rowData={leads}
    columnDefs={columnDefs}
    theme="ag-theme-quartz"   // ✅ new way
    defaultColDef={{ flex: 1, minWidth: 120, sortable: true, filter: true }}
    rowHeight={30}
  />
</div>

      </div>
    </div>
  );
}



