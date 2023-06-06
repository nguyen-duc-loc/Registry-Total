import { Route, Routes } from "react-router-dom";
import "./styles/App.css";
import { ConfigProvider } from "antd";
import Root from "./pages/RootPage";
import Home from "./pages/HomePage";
import Inspections from "./pages/InspectionsPage";
import { useIsAuthenticated } from "react-auth-kit";
import { Navigate } from "react-router-dom";
import Authentication from "./pages/AuthenticationPage";
import Settings from "./pages/SettingsPage";
import ViewInspection from "./pages/ViewInspectionPage";
import Search from "./pages/SearchPage";
import ViewCar from "./pages/ViewCarPage";
import CreateInspection from "./pages/CreateInspectionPage";

const App = () => {
  const PrivateRoute = ({ Component }) => {
    const isAuthenticated = useIsAuthenticated();
    const auth = isAuthenticated();
    return auth ? <Component /> : <Navigate to="/auth" />;
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
        <Route path="/auth" element={<Authentication />} />
        <Route path="/" element={<PrivateRoute Component={Root} />}>
          <Route index element={<Home />} />
          <Route path="inspections">
            <Route path="all" element={<Inspections mode="all" />} />
            <Route path="me" element={<Inspections mode="me" />} />
            <Route path=":inspectionId" element={<ViewInspection />} />
            <Route path="create" element={<CreateInspection />} />
          </Route>
          <Route path="search">
            <Route index element={<Search />} />
            <Route path=":carId" element={<ViewCar />} />
          </Route>
          <Route path="statistics" element={<Home />} />
          <Route path="settings">
            <Route index element={<Navigate to="profile" />} />
            <Route path="profile" element={<Settings mode="profile" />} />
            <Route path="password" element={<Settings mode="password" />} />
          </Route>
        </Route>
      </Routes>
    </ConfigProvider>
  );
};

export default App;
