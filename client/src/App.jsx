import { Route, Routes } from "react-router-dom";
import "./styles/App.css";
import Root from "./pages/Root";
import Home from "./pages/Home";
import { Navigate } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Root />}>
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
