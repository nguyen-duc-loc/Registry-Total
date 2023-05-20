import { ConfigProvider, Tabs } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import Profile from "./Profile";
import { useMediaQuery } from "react-responsive";

const Settings = () => {
  const breakPoint = useMediaQuery({ query: "(max-width: 1200px)" });
  const navigate = useNavigate();
  const location = useLocation();

  const defaultKey = location.pathname.split("/").slice(-1).pop();

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#27272a",
        },
      }}
    >
      <Tabs
        tabPosition={breakPoint ? "top" : "left"}
        tabBarGutter={breakPoint ? 30 : 20}
        tabBarStyle={{
          margin: breakPoint ? "0 2rem" : undefined,
          marginTop: breakPoint ? undefined : "2rem",
          width: breakPoint ? undefined : "25rem",
        }}
        centered={true}
        items={[
          {
            label: "Thông tin cá nhân",
            key: "profile",
            children: <Profile />,
          },
          {
            label: "Thay đổi mật khẩu",
            key: "password",
            children: <Profile />,
          },
        ]}
        style={{
          width: "80%",
          backgroundColor: "#fff",
          margin: "3rem auto",
          border: "1px solid var(--color-grey-dark-1)",
        }}
        onChange={(key) => {
          navigate(`/settings/${key}`);
        }}
        defaultActiveKey={defaultKey}
      />
    </ConfigProvider>
  );
};

export default Settings;
