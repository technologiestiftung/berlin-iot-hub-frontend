import { Thunk, Action, Computed } from "easy-peasy";

export interface DeviceType {
  description: string;
  id: number;
  latitude: number;
  longitude: number;
  ttnAppId: string;
  ttnDeviceId: string;
  records?: Array<any>;
}

export interface ProjectType {
  id: string;
  title: string;
  city: string;
  description: string;
  devices: Array<DeviceType>;
}

export interface ProjectsModel {
  items: Array<ProjectType> | undefined;
  selected: Computed<ProjectsModel, ProjectType | any>;
  save: Action<ProjectsModel>;
  load: Thunk<ProjectsModel>;
}

export interface StoreModel {
  projects: ProjectsModel;
}
