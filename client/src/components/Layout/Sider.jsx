import { CarOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import { useMediaQuery } from "react-responsive";
import Menu from "./MenuItems";
import classes from "./../../styles/Layout/Sider.module.css";

const { Sider } = Layout;

const PageSider = () => {
  const isTablet = useMediaQuery({ query: "(max-width: 992px)" });

  return (
    <Sider breakpoint="lg" className={classes.sider} width={270}>
      <div className={classes.logo}>
        {isTablet ? (
          <CarOutlined style={{ fontSize: "2rem" }} className={classes.icon} />
        ) : (
          <h1>Logo</h1>
        )}
      </div>
      <Menu />
    </Sider>
  );
};

export default PageSider;
