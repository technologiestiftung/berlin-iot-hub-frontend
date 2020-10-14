import { Thunk, Action } from "easy-peasy";

export interface ProjectsModel {
  items: Array<any> | undefined;
  save: Action<ProjectsModel>;
  load: Thunk<ProjectsModel>;
}

export interface StoreModel {
  projects: ProjectsModel;
}
