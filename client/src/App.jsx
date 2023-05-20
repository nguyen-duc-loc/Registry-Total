import { Route, Routes } from "react-router-dom";
import "./styles/App.css";
import { ConfigProvider } from "antd";
import Root from "./pages/RootPage";
import Home from "./pages/HomePage";
import { useIsAuthenticated } from "react-auth-kit";
import { Navigate } from "react-router-dom";
import Authentication from "./pages/AuthenticationPage";
import Settings from "./pages/SettingsPage";
import Profile from "./pages/ProfilePage";
import ChangePassword from "./pages/ChangePasswordPage";

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
          <Route path="request" element={<Home />} />
          <Route path="manage" element={<Home />} />
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
