import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

//Importing Components
import Login from "./Components/Login.js";

function App() {
    return (
      <Router>
        <Route path="/" exact = {true} render={()=> (
        <div>
          <Login/>
          </div>
        )}/>
      </Router>
    );
}

export default App;
