import { Route, Routes } from "react-router-dom";
import "./styles/App.css";
import { ConfigProvider } from "antd";
import { useIsAuthenticated } from "react-auth-kit";
import { Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loading from "./components/UI/Loading";

const Root = lazy(() => import("./pages/RootPage"));
const Home = lazy(() => import("./pages/HomePage"));
const Inspections = lazy(() => import("./pages/InspectionsPage"));
const Authentication = lazy(() => import("./pages/AuthenticationPage"));
const Settings = lazy(() => import("./pages/SettingsPage"));
const ViewInspection = lazy(() => import("./pages/ViewInspectionPage"));
const Search = lazy(() => import("./pages/SearchPage"));
const ViewCar = lazy(() => import("./pages/ViewCarPage"));
const CreateInspection = lazy(() => import("./pages/CreateInspectionPage"));
const Statistics = lazy(() => import("./pages/StatisticsPage"));

const App = () => {
  const PrivateRoute = () => {
    const isAuthenticated = useIsAuthenticated();
    const auth = isAuthenticated();
    return auth ? (
      <Suspense fallback={<Loading />}>
        <Root />
      </Suspense>
    ) : (
      <Navigate to="/auth" />
    );
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Inter",
          colorText: "#27272a",
        },
      }}
    >
      <Routes>
        <Route
          path="/auth"
          element={
            <Suspense fallback={<Loading />}>
              <Authentication />{" "}
            </Suspense>
          }
          loader={() =>
            import("./pages/AuthenticationPage").then((module) =>
              module.loader()
            )
          }
        />
        <Route
          path="/"
          element={<PrivateRoute />}
          loader={() =>
            import("./pages/RootPage").then((module) => module.loader())
          }
        >
          <Route
            index
            element={
              <Suspense fallback={<Loading />}>
                <Home />
              </Suspense>
            }
            loader={() =>
              import("./pages/HomePage").then((module) => module.loader())
            }
          />
          <Route path="inspections">
            <Route
              path="all"
              element={
                <Suspense fallback={<Loading />}>
                  <Inspections mode="all" />
                </Suspense>
              }
              loader={() =>
                import("./pages/InspectionsPage").then((module) =>
                  module.loader()
                )
              }
            />
            <Route
              path="me"
              element={
                <Suspense fallback={<Loading />}>
                  <Inspections mode="me" />
                </Suspense>
              }
              loader={() =>
                import("./pages/InspectionsPage").then((module) =>
                  module.loader()
                )
              }
            />
            <Route
              path=":inspectionId"
              element={
                <Suspense fallback={<Loading />}>
                  <ViewInspection />
                </Suspense>
              }
              loader={(meta) =>
                import("./pages/ViewInspectionPage").then((module) =>
                  module.loader(meta)
                )
              }
            />
            <Route
              path="create"
              element={
                <Suspense fallback={<Loading />}>
                  <CreateInspection />
                </Suspense>
              }
              loader={() =>
                import("./pages/CreateInspectionPage").then((module) =>
                  module.loader()
                )
              }
            />
          </Route>
          <Route path="/cars/search">
            <Route
              index
              element={
                <Suspense fallback={<Loading />}>
                  <Search />
                </Suspense>
              }
              loader={() =>
                import("./pages/SearchPage").then((module) => module.loader())
              }
            />
            <Route
              path=":carId"
              element={
                <Suspense fallback={<Loading />}>
                  <ViewCar />
                </Suspense>
              }
              loader={(meta) =>
                import("./pages/ViewCarPage").then((module) =>
                  module.loader(meta)
                )
              }
            />
          </Route>
          <Route
            path="statistics"
            element={
              <Suspense fallback={<Loading />}>
                <Statistics />
              </Suspense>
            }
            loader={() =>
              import("./pages/StatisticsPage").then((module) => module.loader())
            }
          />
          <Route path="settings">
            <Route index element={<Navigate to="profile" />} />
            <Route
              path="profile"
              element={
                <Suspense fallback={<Loading />}>
                  <Settings mode="profile" />
                </Suspense>
              }
              loader={() =>
                import("./pages/SettingsPage").then((module) => module.loader())
              }
            />
            <Route
              path="password"
              element={
                <Suspense fallback={<Loading />}>
                  <Settings mode="password" />
                </Suspense>
              }
              loader={() =>
                import("./pages/SettingsPage").then((module) => module.loader())
              }
            />
          </Route>
        </Route>
      </Routes>
    </ConfigProvider>
  );
};

export default App;
