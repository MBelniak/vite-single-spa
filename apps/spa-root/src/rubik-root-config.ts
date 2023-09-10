import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructLayoutEngine,
  constructRoutes,
} from "single-spa-layout";
import { buildAppRouting, getTemplate } from "./template.ts";

const singleSpaConfigResponse = await fetch(
  "http://localhost:3000/single-spa-routes"
);
if (singleSpaConfigResponse.ok) {
  const singleSpaConfig = (await singleSpaConfigResponse.json()) as Record<
    string,
    { uri: string; routes: string[] }
  >;
  const routes = getTemplate(buildAppRouting(singleSpaConfig));

  const singleSpaRoutes = constructRoutes(routes);

  const applications = constructApplications({
    routes: singleSpaRoutes,
    loadApp({ name }) {
      if (singleSpaConfig[name]) {
        return System.import(singleSpaConfig[name].uri);
      }
      return System.import(name);
    },
  });

  const layoutEngine = constructLayoutEngine({
    routes: singleSpaRoutes,
    applications,
  });

  applications.forEach(registerApplication);

  layoutEngine.activate();

  start({
    urlRerouteOnly: true,
  });
}
