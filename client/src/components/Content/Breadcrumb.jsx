import { RightOutlined } from "@ant-design/icons";
import { Breadcrumb, ConfigProvider } from "antd";
import classes from "../../styles/Content/Breadcrumb.module.css";
import { useLocation } from "react-router-dom";

const ContentBreadcumb = () => {
  const location = useLocation();

  const defaultItem = { title: "Nhà của tôi" };

  let items = [];

  switch (location.pathname) {
    case "/":
      items = [defaultItem, { title: "Bảng điều khiển" }];
      break;

    case "/inspections/all":
      items = [
        defaultItem,
        { title: "Quản lí đăng kiểm" },
        { title: "Tất cả đăng kiểm" },
      ];
      break;

    case "/inspections/me":
      items = [
        defaultItem,
        { title: "Quản lí đăng kiểm" },
        { title: "Đăng kiểm của tôi" },
      ];
      break;

    case "/create":
      items = [defaultItem, { title: "Tạo đăng kiểm" }];
      break;

    case "/statistics":
      items = [defaultItem, { title: "Thống kê" }];
      break;

    case "/settings/profile":
      items = [
        defaultItem,
        { title: "Cài đặt" },
        { title: "Thông tin cá nhân" },
      ];
      break;

    case "/settings/password":
      items = [
        defaultItem,
        { title: "Cài đặt" },
        { title: "Thay đổi mật khẩu" },
      ];
      break;
  }

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
        items={items}
      />
    </ConfigProvider>
  );
};

export default ContentBreadcumb;
