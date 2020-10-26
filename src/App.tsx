import React, { useEffect } from "react";
import { useStoreActions } from "./state/hooks";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import { Header } from "./components/Header";
import { Overview } from "./components/Overview";
import { Project } from "./components/Project";
import { Footer } from "./components/Footer";

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  const loadDevices = useStoreActions((action) => action.projects.load);

  useEffect(() => {
    loadDevices();
  }, [loadDevices]);

  return (
    <Router>
      <ScrollToTop />
      <Header />
      <Switch>
        <Route exact path="/">
          <Overview />
        </Route>
        <Route path="/:id" children={<Project />}></Route>
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
