import { registerApplication, start, LifeCycles } from "single-spa";

registerApplication({
  name: "@single-spa/welcome",
  app: () =>
    System.import<LifeCycles>(
      "https://unpkg.com/single-spa-welcome/dist/single-spa-welcome.js"
    ),
  activeWhen: ["/root"],
});

registerApplication({
  name: "@rubik/app1",
  app: () => System.import<LifeCycles>("@rubik/app1"),
  activeWhen: ["/app1"],
});

start({
  urlRerouteOnly: true,
});
