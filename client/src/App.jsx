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
const SearchCar = lazy(() => import("./pages/SearchCarPage"));
const SearchInspection = lazy(() => import("./pages/SearchInspectionPage"));
const ViewCar = lazy(() => import("./pages/ViewCarPage"));
const CreateInspection = lazy(() => import("./pages/CreateInspectionPage"));
const Statistics = lazy(() => import("./pages/StatisticsPage"));
const Centres = lazy(() => import("./pages/CentresPage"));
const ViewCentre = lazy(() => import("./pages/ViewCentrePage"));
const PageNotExist = lazy(() => import("./../src/components/UI/PageNotExist"));

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
              <Route path="search" element={<SearchInspection />} />
              <Route path=":inspectionId" element={<ViewInspection />} />
              <Route path="create" element={<CreateInspection />} />
              <Route path="*" element={<PageNotExist />} />
            </Route>
            <Route path="centres">
              <Route index element={<Centres />} />
              <Route path=":centreId" element={<ViewCentre />} />
              <Route path="*" element={<PageNotExist />} />
            </Route>
            <Route path="cars">
              <Route index element={<Navigate to="search" />} />
              <Route path="search" element={<SearchCar />} />
              <Route path=":carId" element={<ViewCar />} />
              <Route path="*" element={<PageNotExist />} />
            </Route>
            <Route path="statistics" element={<Statistics />} />
            <Route path="settings">
              <Route index element={<Navigate to="profile" />} />
              <Route path="profile" element={<Settings mode="profile" />} />
              <Route path="password" element={<Settings mode="password" />} />
              <Route path="*" element={<PageNotExist />} />
            </Route>
            <Route path="*" element={<PageNotExist />} />
          </Route>
        </Routes>
      </Suspense>
    </ConfigProvider>
  );
};

export default App;
