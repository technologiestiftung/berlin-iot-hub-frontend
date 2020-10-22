import { createStore, thunk, action, computed } from "easy-peasy";
import { StoreModel } from "./model";
import { getDevices } from "../lib/requests";
import { content } from "../assets/content";
import { ProjectType } from "../common/interfaces";

const store = createStore<StoreModel>({
  projects: {
    items: undefined,
    selected: computed((state) => (id: number) => {
      if (!state.items) return;
      return state.items.find((item: ProjectType) => item.id === id);
    }),
    save: action((state, payload) => {
      const uniqueProjects = Array.from(
        new Set(payload.map((a) => a.projectId))
      );

      const projects = uniqueProjects.map((projectId: number) => {
        const devices = payload.filter((el) => el.projectId === projectId);

        const project: ProjectType = {
          id: projectId,
          title: content.projects[projectId].title,
          city: content.projects[projectId].city,
          description: content.projects[projectId].description,
          devices: devices,
        };

        return project;
      });
      state.items = projects;
    }),
    load: thunk(async (actions) => {
      const {
        data: { devices },
      } = await getDevices(`${process.env.REACT_APP_API_URL}/api/devices`);
      actions.save(devices);
    }),
  },
});

export default store;
