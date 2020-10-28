/** @jsx jsx */
import React from "react";
import { Switch, Route } from "react-router-dom";
import { jsx } from "theme-ui";

import { Overview } from "./Overview";
import { Project } from "./Project";

export const MainArea: React.FC = () => {
  return (
    <main sx={{ zIndex: 0 }}>
      <Switch>
        <Route exact path="/">
          <Overview />
        </Route>
        <Route path="/:id" children={<Project />}></Route>
      </Switch>
    </main>
  );
};
