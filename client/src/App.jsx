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
const Centres = lazy(() => import("./pages/CentresPage"));
const CreateCentre = lazy(() => import("./pages/CreateCentrePage"));
const ViewCentre = lazy(() => import("./pages/ViewCentrePage"));

const App = () => {
  const PrivateRoute = () => {
    const isAuthenticated = useIsAuthenticated();
    const auth = isAuthenticated();
    return auth ? <Root /> : <Navigate to="/auth" />;
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
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/auth" element={<Authentication />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route index element={<Home />} />
            <Route path="inspections">
              <Route path="all" element={<Inspections mode="all" />} />
              <Route path="me" element={<Inspections mode="me" />} />
              <Route path=":inspectionId" element={<ViewInspection />} />
              <Route path="create" element={<CreateInspection />} />
            </Route>
            <Route path="centres">
              <Route path="all" element={<Centres />} />
              <Route path="create" element={<CreateCentre />} />
              <Route path=":centreId" element={<ViewCentre />} />
            </Route>
            <Route path="/cars/search">
              <Route index element={<Search />} />
              <Route path=":carId" element={<ViewCar />} />
            </Route>
            <Route path="statistics" element={<Statistics />} />
            <Route path="settings">
              <Route index element={<Navigate to="profile" />} />
              <Route path="profile" element={<Settings mode="profile" />} />
              <Route path="password" element={<Settings mode="password" />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </ConfigProvider>
  );
};

export default App;
