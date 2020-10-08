import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Overview } from "./components/Overview";
import { Project } from "./components/Project";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Overview />
          </Route>
          <Route path="/:id" children={<Project />}></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
