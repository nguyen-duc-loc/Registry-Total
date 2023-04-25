import { CarOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import { useMediaQuery } from "react-responsive";
import Menu from "./MenuItems";
import { useState } from "react";
import classes from "./../../styles/Layout/Sider.module.css";

const { Sider } = Layout;

const PageSider = () => {
  const isTablet = useMediaQuery({ query: "(max-width: 992px)" });
  const [controlHeightLG, setControlHeightLG] = useState(55);

  return (
    <Sider
      breakpoint="lg"
      onCollapse={(collapsed) => {
        if (collapsed) setControlHeightLG(50);
        else setControlHeightLG(55);
      }}
      className={classes.sider}
      width={270}
    >
      <div className={classes.logo}>
        {isTablet ? (
          <CarOutlined style={{ fontSize: "2rem" }} className={classes.icon} />
        ) : (
          <h1>Logo</h1>
        )}
      </div>
      <Menu controlHeightLG={controlHeightLG} />
    </Sider>
  );
};

export default PageSider;
