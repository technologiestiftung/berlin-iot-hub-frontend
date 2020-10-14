import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useStoreActions } from "./state/hooks";
import { Header } from "./components/Header";
import { Overview } from "./components/Overview";
import { Project } from "./components/Project";

function App() {
  const loadDevices = useStoreActions((action) => action.projects.load);

  useEffect(() => {
    loadDevices();
  }, [loadDevices]);

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
