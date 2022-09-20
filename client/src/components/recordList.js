import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import '../App.css';

const Record = (props) => (
  <tr>
    <td>{props.record.name}</td>
    <td>{props.record.address}</td>
    <td>{props.record.note}</td>
    <td>{props.record.category}</td>
    <td>
      <Link className="btn btn-link" to={`/edit/${props.record._id}`}><EditIcon className="icon" /></Link>
      <button className="btn btn-link" onClick={() => { props.deleteRecord(props.record._id); }} ><ClearIcon className="icon"/></button>
    </td>
  </tr>
);
 
// function 
export default function RecordList() {
  const [records, setRecords] = useState([]);

  // fetch records
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5000/record/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const records = await response.json();
      setRecords(records);
    }
    getRecords();
    return;
  },
  [records.length]);
 
  // delete
  async function deleteRecord(id) {
    await fetch(`http://localhost:5000/${id}`, {
      method: "DELETE"
    });
    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }
 
  // map out the records on the table
  function recordList() {
    return records.map((record) => {
      return (
        <Record record={record} deleteRecord={() => deleteRecord(record._id)} key={record._id} />
      );
    });
  }
  
  return (
    <div className="m-5">
      <h3 className="restaurantTitle fw-bold mb-5 border border-light border-3">Restaurants List</h3>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/create">
                Add new +
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="table-responsive-sm">
     <table className="table table-hover" style={{ marginTop: 20 }}>
      <caption className="text-white">List of restaurants</caption> 
       <thead>
         <tr>
           <th>Name</th>
           <th>Address</th>
           <th className="w-25">Note</th>
           <th>Category</th>
           <th>Action</th>
         </tr>
       </thead>
       <tbody>{recordList()}</tbody>
     </table>
     </div>
   </div>
 );
}