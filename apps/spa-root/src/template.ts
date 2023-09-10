export const getTemplate = (contentRoutes: string) => `
    <single-spa-router>
      <nav class="topnav">
        <application name="@rubik/nav"></application>
      </nav>
      <div class="main-content">
        ${contentRoutes}
        <route default>
          <h1>404 Not Found</h1>
        </route>
      </div>
      <footer>
        <application name="@rubik/footer"></application>
      </footer>
    </single-spa-router>
  `;

const appendApp = (appName: string, element: HTMLElement) => {
  const defaultRoute = document.createElement("route");
  defaultRoute.setAttribute("default", "");

  const appElement = document.createElement("application");
  appElement.setAttribute("name", appName);

  defaultRoute.appendChild(appElement);
  element.appendChild(defaultRoute);
};

const getOrCreateRoute = (parent: HTMLElement, path: string) => {
  let element: any = Array.from(parent.childNodes)
    .filter((node: any) => node.nodeName === "ROUTE")
    .find((element: any) => element.getAttribute("path") === path);

  if (!element) {
    element = document.createElement("route");
    element.setAttribute("path", path);
    parent.appendChild(element);
  }

  return element;
};

export const buildAppRouting = (
  apps: Record<string, { uri: string; routes: string[] }>
) => {
  const appNames = Object.keys(apps);
  const tempXml = document.createElement("temp");
  tempXml.setAttribute("id", "content-routes");

  appNames.forEach((appName) => {
    const paths = apps[appName].routes ? apps[appName].routes : [];

    paths.forEach((path) => {
      const parts = path.split("/");

      const elements = [tempXml];
      [...Array(parts.length)].forEach((_, x) => {
        elements.push(getOrCreateRoute(elements[x], parts[x]));
      });

      appendApp(appName, elements.at(-1) as HTMLElement);
    });
  });

  Array.from(tempXml.getElementsByTagName("route"))
    .filter((route) => route.children.length === 0)
    .forEach((element) => element.remove());

  return tempXml.innerHTML;
};
