import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";

export default function LeadForm() {
  const { id } = useParams();
  const nav = useNavigate();
  const [lead, setLead] = useState({
    first_name:"", last_name:"", email:"", phone:"", company:"", city:"", state:"", source:"", status:"", score:0, lead_value:0, is_qualified:false, last_activity_at:""
  });

  useEffect(()=>{
    if(id){
      API.get(`/leads/${id}`).then(res=>setLead(res.data));
    }
  },[id]);

  const submit = async e => {
    e.preventDefault();
    if(id) await API.put(`/leads/${id}`, lead);
    else await API.post(`/leads`, lead);
    nav("/");
  };

  return (
    <div className="container">
      <h2>{id ? "Edit" : "New"} Lead</h2>
      <form style={{display:"grid",gap:"10px"}} onSubmit={submit}>
        <input placeholder="First Name" value={lead.first_name} onChange={e=>setLead({...lead,first_name:e.target.value})}/>
        <input placeholder="Last Name" value={lead.last_name} onChange={e=>setLead({...lead,last_name:e.target.value})}/>
        <input placeholder="Email" value={lead.email} onChange={e=>setLead({...lead,email:e.target.value})}/>
        <input placeholder="Phone" value={lead.phone} onChange={e=>setLead({...lead,phone:e.target.value})}/>
        <input placeholder="Company" value={lead.company} onChange={e=>setLead({...lead,company:e.target.value})}/>
        <input placeholder="City" value={lead.city} onChange={e=>setLead({...lead,city:e.target.value})}/>
        <input placeholder="State" value={lead.state} onChange={e=>setLead({...lead,state:e.target.value})}/>
        <input placeholder="Source" value={lead.source} onChange={e=>setLead({...lead,source:e.target.value})}/>
        <input placeholder="Status" value={lead.status} onChange={e=>setLead({...lead,status:e.target.value})}/>
        <input type="number" placeholder="Score" value={lead.score} onChange={e=>setLead({...lead,score:Number(e.target.value)})}/>
        <input type="number" placeholder="Lead Value" value={lead.lead_value} onChange={e=>setLead({...lead,lead_value:Number(e.target.value)})}/>
        <label>
          <input type="checkbox" checked={lead.is_qualified} onChange={e=>setLead({...lead,is_qualified:e.target.checked})}/> Qualified
        </label>
        <input type="date" value={lead.last_activity_at ? lead.last_activity_at.split("T")[0] : ""} onChange={e=>setLead({...lead,last_activity_at:e.target.value})}/>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
