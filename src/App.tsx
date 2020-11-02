import React, { useEffect } from "react";
import { useStoreActions } from "./state/hooks";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import { MainArea } from "./components/MainArea";
import { Footer } from "./components/Footer";
import { CookieBanner } from "./components/CookieBanner";

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
      <MainArea />
      <Footer />
      <CookieBanner />
    </Router>
  );
};

export default App;
