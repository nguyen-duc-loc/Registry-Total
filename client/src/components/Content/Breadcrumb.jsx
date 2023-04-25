import { RightOutlined } from "@ant-design/icons";
import { Breadcrumb, ConfigProvider } from "antd";
import classes from "../../styles/Content/Breadcrumb.module.css";

const ContentBreadcumb = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          marginXS: 10,
          colorTextDescription: "var(--color-grey-dark-3)",
          colorText: "var(--color-black)",
        },
      }}
    >
      <Breadcrumb
        className={classes.breadcrumb}
        separator={
          <RightOutlined
            className={classes.icon}
            style={{
              fontSize: "1.1rem",
            }}
          />
        }
        items={[
          {
            title: "Nhà của tôi",
          },
          {
            title: "Bảng điều khiển",
          },
        ]}
      />
    </ConfigProvider>
  );
};

export default ContentBreadcumb;
