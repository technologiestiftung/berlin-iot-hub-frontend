import { createStore, thunk, action, computed } from "easy-peasy";
import { StoreModel } from "./model";
import { getDevices } from "../lib/requests";
import { content } from "../assets/content";
import { ProjectType } from "../state/model";

const store = createStore<StoreModel>({
  projects: {
    items: undefined,
    selected: computed((state: any) => (id: string) => {
      if (!state.items) return;
      return state.items.find((item: ProjectType) => item.id === id);
    }),
    save: action((state: any, payload: any) => {
      const uniqueProjects = Array.from(
        new Set(payload.map((a: any) => a.ttnAppId))
      );

      const projects = uniqueProjects.map((projectId: any) => {
        const devices = payload.filter((el: any) => el.ttnAppId === projectId);

        const project: ProjectType = {
          id: projectId,
          // @ts-ignore
          title: content.projects[projectId].title,
          // @ts-ignore
          city: content.projects[projectId].city,
          // @ts-ignore
          description: content.projects[projectId].description,
          devices: devices,
        };

        return project;
      });
      state.items = projects;
    }),
    load: thunk(async (actions: any) => {
      const {
        data: { devices },
      } = await getDevices(`${process.env.REACT_APP_API_URL}/api/devices`);
      actions.save(devices);
    }),
  },
});

export default store;
