interface Project {
  title: string;
  city: string;
  description: string;
}
// type ProjectNameTypes = "temp_grunewald" | "testabc";
interface Content {
  projects: {
    [key: string]: Project;
  };
}

export const content: Content = {
  projects: {
    temp_grunewald: {
      title: "TSB-Temperatur",
      city: "Berlin, Deutschland",
      description:
        "Hier steht eine Beschreibung des Projekts. Hier steht eine Beschreibung.",
    },
    testabc: {
      title: "Test-Projekt",
      city: "Berlin, Deutschland",
      description:
        "Hier steht eine Beschreibung des Projekts. Hier steht eine Beschreibung.",
    },
  },
};
