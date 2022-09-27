import React from "react";
import '../App.css';
import logo from "../assets/dish.png";
import "bootstrap/dist/css/bootstrap.css";

// import NavLink to utilize the react router
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
  
  <header>
    <div>
      <nav className="navbar navbar-expand navbar-light mx-5">
        <NavLink className="navbar-brand" to="/">
          <img src={logo} alt='logo'></img>
        </NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"> 
        <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/create">
                <span className="addnew fs-5 fw-bold">Add new +</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </header>
  );
}