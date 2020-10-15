import { DataRow } from "../components/project/DataTable";
import { SummaryData } from "../components/project/ProjectSummary";

export const tableData: Array<DataRow> = [
  {
    date: "15.10.2020",
    time: "20:00:00 Uhr",
    value: 35,
  },
  {
    date: "15.10.2020",
    time: "19:00:00 Uhr",
    value: 55,
  },
  {
    date: "15.10.2020",
    time: "18:00:00 Uhr",
    value: 26,
  },
  {
    date: "15.10.2020",
    time: "17:00:00 Uhr",
    value: 43,
  },
  {
    date: "15.10.2020",
    time: "16:00:00 Uhr",
    value: 46,
  },
];

export const projectSummary: SummaryData = {
  title: "PAXCounter",
  description:
    "An allen Eingängen des Tempelhofer Feldes sind sogenannte PAXCounter installiert, die die Besucherströme auf dem Tempelhofer Feld messen und analysierbar machen.",
  noOfDevices: 4,
};
