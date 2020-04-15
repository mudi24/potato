import React from "react";
import { Router, Route } from "react-router-dom";
import history from './config/history'
import "./App.css";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";

function App() {
  return (
    <Router history={history}>
      <div>
        <Route exact={true} path="/" component={Home}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/signUp" component={SignUp}></Route>
      </div>
    </Router>
  );
}

export default App;
