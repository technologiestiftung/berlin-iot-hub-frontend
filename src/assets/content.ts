import { ProjectType } from "../common/interfaces";

interface Content {
  projects: {
    [key: number]: ProjectType;
  };
}

export const content: Content = {
  projects: {
    3: {
      id: 3,
      title: "TSB-Temperatur",
      city: "Berlin, Deutschland",
      description:
        "Hier steht eine Beschreibung des Projekts. Hier steht eine Beschreibung.",
      devices: [],
    },
    2: {
      id: 2,
      title: "Test-Projekt",
      city: "Berlin, Deutschland",
      description:
        "Hier steht eine Beschreibung des Projekts. Hier steht eine Beschreibung.",
      devices: [],
    },
  },
};
