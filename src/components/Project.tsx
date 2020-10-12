/** @jsx jsx */
import React from "react";
import { useParams } from "react-router-dom";
import { jsx } from "theme-ui";
interface RouteParams {
  id: string;
}
export const Project: React.FC = () => {
  let { id } = useParams<RouteParams>();
  return <h1>Ein Projekt mit der ID: {id}</h1>;
};
