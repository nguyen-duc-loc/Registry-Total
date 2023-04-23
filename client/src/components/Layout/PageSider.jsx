import { CarOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import classes from "./../../styles/Layout/PageSider.module.css";
import MenuItem from "./MenuItem";
import { useState } from "react";

const { Sider } = Layout;

const PageSider = (props) => {
  const [controlHeightLG, setControlHeightLG] = useState(55);

  return (
    <Sider
      breakpoint="lg"
      onCollapse={(collapsed) => {
        if (collapsed) setControlHeightLG(50);
        else setControlHeightLG(55);
      }}
      className={classes.sider}
      width={280}
    >
      <div className={classes.logo}>
        {props.isTablet ? (
          <CarOutlined className={classes.icon} />
        ) : (
          <h1>Logo</h1>
        )}
      </div>
      <MenuItem
        isMobile={false}
        isTablet={props.isTablet}
        controlHeightLG={controlHeightLG}
      />
    </Sider>
  );
};

export default PageSider;
