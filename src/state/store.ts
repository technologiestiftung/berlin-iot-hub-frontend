import { createStore, thunk, action } from "easy-peasy";
import { StoreModel } from "./model";
import { getDevices } from "../lib/requests";
import { content } from "../assets/content";
import { Project } from "../components/ProjectPreview";

const store = createStore<StoreModel>({
  projects: {
    items: undefined,
    save: action((state: any, payload: any) => {
      const uniqueProjects = Array.from(
        new Set(payload.map((a: any) => a.ttnAppId))
      );

      const projects = uniqueProjects.map((projectId: any) => {
        //const entries = payload.filter((el: any) => el.ttnAppId === projectId);

        const project: Project = {
          id: projectId,
          // @ts-ignore
          title: content.projects[projectId].title,
          // @ts-ignore
          location: content.projects[projectId].location,
          // @ts-ignore
          description: content.projects[projectId].description,
          //entries: entries,
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
