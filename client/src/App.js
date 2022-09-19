import React from "react";
import './App.css';

// use route to define different routes 
import {Route, Routes} from "react-router-dom";

// import all components
import Navbar from "./components/Navbar";
import RecordList from "./components/recordList";
import Create from "./components/create";
import Edit from "./components/edit";

function App() {
    return(
        <div>
            <Navbar />
            <Routes>
            <Route exact path="/" element={<RecordList />} />
                <Route path="/create" element={<Create />} />
                <Route path="/edit/:id" element={<Edit />} />
            </Routes>
        </div>
    )
}

export default App 