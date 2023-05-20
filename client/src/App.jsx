import { Route, Routes } from "react-router-dom";
import "./styles/App.css";
import { ConfigProvider } from "antd";
import Root from "./pages/Root";
import Home from "./pages/Home";
import { useIsAuthenticated } from "react-auth-kit";
import { Navigate } from "react-router-dom";
import Authentication from "./pages/Authentication";

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
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="dashboard" element={<Home />} />
          <Route path="request" element={<Home />} />
          <Route path="manage" element={<Home />} />
          <Route path="statistics" element={<Home />} />
          <Route path="settings" element={<Home />} />
        </Route>
      </Routes>
    </ConfigProvider>
  );
};

export default App;
