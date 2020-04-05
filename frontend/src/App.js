import React from "react";
import logo from "./logo.svg";
import { BrowserRouter, Route, Link } from "react-router-dom";
import "./App.css";
import OtherPage from "./OtherPage";
import Fib from "./Fib";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Link to="/otherpage">OtherPage</Link>
          <Link to="/">Main</Link>
        </header>
        <Route exact path={"/"} component={Fib} />
        <Route path={"/otherpage"} component={OtherPage} />
      </div>
    </BrowserRouter>
  );
}

export default App;
