import { Route, Routes } from "react-router-dom";
import "./styles/App.css";
import Root from "./pages/Root";
import Home from "./pages/Home";
import { useIsAuthenticated } from "react-auth-kit";
import { Navigate } from "react-router-dom";
import LoginPage from "./pages/Login";

const App = () => {
  const PrivateRoute = ({ Component }) => {
    const isAuthenticated = useIsAuthenticated();
    const auth = isAuthenticated();
    return auth ? <Component /> : <Navigate to="/login" />;
  };

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<PrivateRoute Component={Root} />}>
        <Route index element={<Navigate to="/dashboard" />}></Route>
        <Route path="dashboard" element={<Home />}></Route>
        <Route path="request" element={<Home />}></Route>
        <Route path="manage" element={<Home />}></Route>
        <Route path="statistics" element={<Home />}></Route>
        <Route path="settings" element={<Home />}></Route>
        <Route path="logout" element={<Home />}></Route>
      </Route>
    </Routes>
  );
};

export default App;
