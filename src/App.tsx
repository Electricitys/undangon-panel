import { Refine, WelcomePage, Authenticated } from "@refinedev/core";
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
import { NotificationsProvider } from "@mantine/notifications";
import { useLocalStorage } from "@mantine/hooks";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import routerBindings, {
  NavigateToResource,
  CatchAllNavigate,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router-v6";
import { dataProvider } from "feathers-provider";
import { authProvider } from "authProvider";
import {
  TemplateCreate,
  TemplateEdit,
  TemplateList,
  TemplateShow,
} from "pages/Templates";
import { UserCreate, UserEdit, UserList, UserShow } from "pages/Users";
import {
  InvitationCreate,
  InvitationEdit,
  InvitationList,
  InvitationShow,
} from "pages/Invitations";
import {
  CategoryCreate,
  CategoryEdit,
  CategoryList,
  CategoryShow,
} from "pages/Categories";
import {
  PackageCreate,
  PackageEdit,
  PackageList,
  PackageShow,
} from "pages/Packages";
import {
  IconCategory,
  IconFileDelta,
  IconFileDollar,
  IconTemplate,
  IconUsers,
} from "@tabler/icons";
import { Header } from "components";

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
                authProvider={authProvider}
                routerProvider={routerBindings}
                dataProvider={dataProvider()}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                }}
                resources={[
                  {
                    name: "categories",
                    list: "/categories",
                    show: "/category/:id",
                    create: "/category/create",
                    edit: "/category/edit/:id",
                    meta: {
                      icon: <IconCategory />,
                    },
                  },
                  {
                    name: "invitations",
                    list: "/invitations",
                    show: "/invitation/:id",
                    create: "/invitation/create",
                    edit: "/invitation/edit/:id",
                    meta: {
                      icon: <IconFileDelta />,
                    },
                  },
                  {
                    name: "templates",
                    list: "/templates",
                    show: "/template/:id",
                    create: "/template/create",
                    edit: "/template/edit/:id",
                    meta: {
                      icon: <IconTemplate />,
                    },
                  },
                  {
                    name: "users",
                    list: "/users",
                    show: "/user/:id",
                    create: "/user/create",
                    edit: "/user/edit/:id",
                    meta: {
                      icon: <IconUsers />,
                    },
                  },
                  {
                    name: "packages",
                    list: "/packages",
                    show: "/package/:id",
                    create: "/package/create",
                    edit: "/package/edit/:id",
                    meta: {
                      icon: <IconFileDollar />,
                    },
                  },
                ]}
              >
                <Routes>
                  <Route index element={<WelcomePage />} />
                  <Route
                    element={
                      <Authenticated
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <ThemedLayoutV2 Header={Header}>
                          <Outlet />
                        </ThemedLayoutV2>
                      </Authenticated>
                    }
                  >
                    <Route path="packages" element={<PackageList />} />
                    <Route path="package">
                      <Route path=":id" element={<PackageShow />} />
                      <Route path="create" element={<PackageCreate />} />
                      <Route path="edit/:id" element={<PackageEdit />} />
                      <Route path="*" element={<ErrorComponent />} />
                    </Route>
                    <Route path="categories" element={<CategoryList />} />
                    <Route path="category">
                      <Route path=":id" element={<CategoryShow />} />
                      <Route path="create" element={<CategoryCreate />} />
                      <Route path="edit/:id" element={<CategoryEdit />} />
                      <Route path="*" element={<ErrorComponent />} />
                    </Route>
                    <Route path="invitations" element={<InvitationList />} />
                    <Route path="invitation">
                      <Route path=":id" element={<InvitationShow />} />
                      <Route path="create" element={<InvitationCreate />} />
                      <Route path="edit/:id" element={<InvitationEdit />} />
                      <Route path="*" element={<ErrorComponent />} />
                    </Route>
                    <Route path="templates" element={<TemplateList />} />
                    <Route path="template">
                      <Route path=":id" element={<TemplateShow />} />
                      <Route path="create" element={<TemplateCreate />} />
                      <Route path="edit/:id" element={<TemplateEdit />} />
                      <Route path="*" element={<ErrorComponent />} />
                    </Route>
                    <Route path="users" element={<UserList />} />
                    <Route path="user">
                      <Route path=":id" element={<UserShow />} />
                      <Route path="create" element={<UserCreate />} />
                      <Route path="edit/:id" element={<UserEdit />} />
                      <Route path="*" element={<ErrorComponent />} />
                    </Route>
                  </Route>
                  <Route
                    element={
                      <Authenticated fallback={<Outlet />}>
                        <NavigateToResource />
                      </Authenticated>
                    }
                  >
                    <Route path="/login" element={<AuthPage type="login" />} />
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
