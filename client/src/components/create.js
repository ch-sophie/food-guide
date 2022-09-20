import React, { useState } from "react";
import '../App.css';
import { useNavigate } from "react-router";
 
export default function Create() {
  const [form, setForm] = useState({
    name: "",
    address: "",
    category: "",
    note: "",
  });
  
  const navigate = useNavigate();
  
  // update the state properties
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }
 
  // handle submission
  async function onSubmit(e) {
    e.preventDefault();
    
    // when a post request is sent to the create url, it will add a new record to the database
    const newItem = { ...form };
 
    await fetch("http://localhost:5000/record/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    })
    .catch(error => {
      window.alert(error);
      return;
    });
 
    setForm({ name: "", address: "", category: "", note: "" });
    navigate("/");
  }

  return (
    <div>
      <h3 className="m-5 text-white fw-bold">Add a restaurant</h3>

      <form onSubmit={onSubmit}>
        <div className="form-group mx-5 my-4 fw-bold">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control mt-1  border-0" id="name" value={form.name} onChange={(e) => updateForm({ name: e.target.value })} />
        </div>
       
        <div className="form-group mx-5 my-4 fw-bold">
          <label htmlFor="address">Address</label>
          <input type="text" className="form-control mt-1 border-0" id="address" value={form.address}onChange={(e) =>updateForm({ address: e.target.value })} />
        </div>

        <div className="form-group mx-5 my-4 fw-bold">
          <label htmlFor="note">Additional Note</label>
          <input type="text" className="form-control mt-1 border-0" id="note" value={form.note}onChange={(e) =>updateForm({ note: e.target.value })} />
        </div>

        <div className="form-group mx-5 my-4 fw-bold">
        <label htmlFor="category">Category</label><br />
          <div className="form-check form-check-inline mt-1">
            <input className="form-check-input border-0" type="radio" name="category" id="categoryChinese" value="Chinese" checked={form.category === "Chinese"} onChange={(e) => updateForm({ category: e.target.value })} />
            <label htmlFor="categoryChinese" className="form-check-label">Chinese</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input border-0" type="radio" name="category" id="categoryKorean" value="Korean" checked={form.category === "Korean"} onChange={(e) => updateForm({ category: e.target.value })} />
            <label htmlFor="categoryKorean" className="form-check-label">Korean</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input border-0" type="radio" name="category" id="categoryJapanese" value="Japanese" checked={form.category === "Japanese"} onChange={(e) => updateForm({ category: e.target.value })} />
            <label htmlFor="categoryJapanese" className="form-check-label">Japanese</label>
          </div>
        </div>
        <br />

        <div className="form-group mx-5">
          <input type="submit" value="Add to the list" className="btn buttonform" />
          <a href="/" class="cancel" className="btn buttonform">Cancel</a>
        </div>
      </form>
    </div>
    );
}