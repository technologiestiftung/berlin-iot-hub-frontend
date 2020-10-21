import { ProjectType } from "../common/interfaces";

interface Content {
  projects: {
    [key: string]: ProjectType;
  };
}

export const content: Content = {
  projects: {
    temp_grunewald: {
      id: "temp_grunewald",
      title: "TSB-Temperatur",
      city: "Berlin, Deutschland",
      description:
        "Hier steht eine Beschreibung des Projekts. Hier steht eine Beschreibung.",
      devices: [],
    },
    testabc: {
      id: "testabc",
      title: "Test-Projekt",
      city: "Berlin, Deutschland",
      description:
        "Hier steht eine Beschreibung des Projekts. Hier steht eine Beschreibung.",
      devices: [],
    },
  },
};
