import { RightOutlined } from "@ant-design/icons";
import { Breadcrumb, ConfigProvider } from "antd";
import classes from "../../styles/Content/Breadcrumb.module.css";
import { useLocation } from "react-router-dom";
import { useAuthUser } from "react-auth-kit";

const ContentBreadcumb = () => {
  const location = useLocation();
  const auth = useAuthUser();
  const admin = auth().data.role === "admin";

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
    } else if (path.includes("/create")) {
      items = [
        defaultItem,
        { title: "Quản lí đăng kiểm" },
        { title: "Tạo đăng kiểm" },
      ];
    } else if (path.includes("/search")) {
      items = [
        defaultItem,
        !admin && { title: "Quản lí đăng kiểm" },
        { title: "Tra cứu đăng kiểm" },
      ];
    } else {
      items = [
        defaultItem,
        !admin && { title: "Quản lí đăng kiểm" },
        { title: "Xem đăng kiểm" },
      ];
    }
  } else if (path.includes("/centres")) {
    if (path === "/all") {
      items = [
        defaultItem,
        { title: "Quản lí trung tâm" },
        { title: "Tất cả trung tâm" },
      ];
    } else {
      items = [
        defaultItem,
        { title: "Quản lí trung tâm" },
        { title: "Xem trung tâm" },
      ];
    }
  } else if (path === "/create") {
    items = [defaultItem, { title: "Tạo đăng kiểm" }];
  } else if (path === "/statistics") {
    items = [defaultItem, { title: "Thống kê" }];
  } else if (path.includes("/cars/search")) {
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
