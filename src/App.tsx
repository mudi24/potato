import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Index from "./components/Index/Index";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";

function App() {
  return (
    <Router>
      <Route exact={true} path="/" component={Index}></Route>
      <Route path="/login" component={Login}></Route>
      <Route path="/signUp" component={SignUp}></Route>
    </Router>
  );
}

export default App;
