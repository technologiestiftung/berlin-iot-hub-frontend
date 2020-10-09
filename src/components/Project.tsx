/** @jsx jsx */
import React from "react";
import { useParams } from "react-router-dom";
import { jsx } from "theme-ui";

export const Project: React.FC = () => {
  let { id } = useParams<{id: string}>();
  return <h1>Ein Projekt mit der ID: {id}</h1>;
};
