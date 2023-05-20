import { NavLink } from "react-router-dom";
import classes from "./../../../styles/Content/Settings/Sider.module.css";

const Sider = () => {
  return (
    <ul className={classes.items}>
      <NavLink
        to="/settings/profile"
        className={({ isActive }) => (isActive ? classes.active : undefined)}
      >
        <li>Thông tin cá nhân</li>
      </NavLink>
      <NavLink
        to="/settings/password"
        className={({ isActive }) => (isActive ? classes.active : undefined)}
      >
        <li>Thay đổi mật khẩu</li>
      </NavLink>
    </ul>
  );
};

export default Sider;
