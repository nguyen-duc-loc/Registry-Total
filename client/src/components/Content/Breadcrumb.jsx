import { RightOutlined } from "@ant-design/icons";
import { Breadcrumb, ConfigProvider } from "antd";
import classes from "../../styles/Content/Breadcrumb.module.css";
import { useLocation } from "react-router-dom";

const ContentBreadcumb = () => {
  const location = useLocation();

  const defaultItem = { title: "Nhà của tôi" };

  let items = [];

  const path = location.pathname;

  if (path === "/") {
    items = [defaultItem, { title: "Bảng điều khiển" }];
  } else if (path.includes("/inspections")) {
    if (path.includes("/all")) {
      items = [
        defaultItem,
        { title: "Quản lí đăng kiểm" },
        { title: "Tất cả đăng kiểm" },
      ];
    } else if (path.includes("/me")) {
      items = [
        defaultItem,
        { title: "Quản lí đăng kiểm" },
        { title: "Đăng kiểm của tôi" },
      ];
    } else {
      items = [
        defaultItem,
        { title: "Quản lí đăng kiểm" },
        { title: "Xem đăng kiểm" },
      ];
    }
  } else if (path === "/create") {
    items = [defaultItem, { title: "Tạo đăng kiểm" }];
  } else if (path === "/statistics") {
    items = [defaultItem, { title: "Thống kê" }];
  } else if (path === "/search") {
    items = [defaultItem, { title: "Tra cứu phương tiện" }];
  } else if (path.includes("/settings")) {
    if (path.includes("/profile")) {
      items = [
        defaultItem,
        { title: "Cài đặt" },
        { title: "Thông tin cá nhân" },
      ];
    } else if (path.includes("/password")) {
      items = [
        defaultItem,
        { title: "Cài đặt" },
        { title: "Thay đổi mật khẩu" },
      ];
    }
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
