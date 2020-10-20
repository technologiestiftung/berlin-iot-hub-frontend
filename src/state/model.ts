import { Thunk, Action, Computed } from "easy-peasy";
import { ProjectType, DeviceType } from "../common/interfaces";

export interface ProjectsModel {
  items: Array<ProjectType> | undefined;
  selected: Computed<ProjectsModel, ProjectType | any>;
  save: Action<ProjectsModel, DeviceType[]>;
  load: Thunk<ProjectsModel>;
}

export interface StoreModel {
  projects: ProjectsModel;
}
