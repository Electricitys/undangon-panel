import {
  Refine,
  GitHubBanner,
  WelcomePage,
  Authenticated,
} from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  AuthPage,
  ErrorComponent,
  notificationProvider,
  RefineThemes,
  ThemedLayoutV2,
} from "@refinedev/mantine";

import {
  MantineProvider,
  Global,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";
import { MantineInferencer } from "@refinedev/inferencer/mantine";
import { NotificationsProvider } from "@mantine/notifications";
import { useLocalStorage } from "@mantine/hooks";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import routerBindings, {
  NavigateToResource,
  CatchAllNavigate,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router-v6";
import { Header } from "./components/header";
import { dataProvider } from "rest-data-provider";

function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          {/* You can change the theme colors here. example: theme={{ ...RefineThemes.Magenta, colorScheme:colorScheme }} */}
          <MantineProvider
            theme={{ ...RefineThemes.Blue, colorScheme: colorScheme }}
            withNormalizeCSS
            withGlobalStyles
          >
            <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
            <NotificationsProvider position="top-right">
              <Refine
                notificationProvider={notificationProvider}
                routerProvider={routerBindings}
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                }}
                resources={[
                  // {
                  //   name: "templates",
                  //   list: "/tamplates",
                  //   show: "/templates/:id",
                  //   create: "/templates/create",
                  //   edit: "/templates/edit/:id",
                  // },
                  {
                    name: "blog_posts",
                    list: "/blog-posts",
                    show: "/blog-posts/:id",
                    create: "/blog-posts/create",
                    edit: "/blog-posts/edit/:id",
                  },
                ]}
              >
                <Routes>
                  <Route index element={<WelcomePage />} />
                  {/* <Route path="templates">
                    <Route index element={<MantineInferencer />} />
                    <Route path=":id" element={<MantineInferencer />} />
                    <Route path="create" element={<MantineInferencer />} />
                    <Route path="edit/:id" element={<MantineInferencer />} />
                    <Route path="*" element={<ErrorComponent />} />
                  </Route> */}
                  <Route path="blog-posts">
                    <Route
                      index
                      element={<MantineInferencer hideCodeViewerInProduction />}
                    />
                    <Route
                      path="show/:id"
                      element={<MantineInferencer hideCodeViewerInProduction />}
                    />
                    <Route
                      path="edit/:id"
                      element={<MantineInferencer hideCodeViewerInProduction />}
                    />
                    <Route
                      path="create"
                      element={<MantineInferencer hideCodeViewerInProduction />}
                    />
                  </Route>
                  <Route path="*" element={<ErrorComponent />} />
                </Routes>
                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
            </NotificationsProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
