import { Tabs } from "antd";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";
import { useMediaQuery } from "react-responsive";
import ChangePassword from "./ChangePassword";
import TextWithIcon from "../../UI/TextWithIcon";
import { IoLockClosedOutline, IoRocketOutline } from "react-icons/io5";

const Settings = (props) => {
  const breakPoint = useMediaQuery({ query: "(max-width: 1200px)" });
  const navigate = useNavigate();

  return (
    <Tabs
      tabPosition={breakPoint ? "top" : "left"}
      tabBarGutter={breakPoint ? 30 : 16}
      tabBarStyle={{
        margin: breakPoint ? "1.2rem 2rem" : undefined,
        marginTop: breakPoint ? undefined : "2rem",
        width: breakPoint ? undefined : "25rem",
      }}
      centered={true}
      items={[
        {
          label: (
            <TextWithIcon Icon={IoRocketOutline} text="Thông tin cá nhân" />
          ),
          key: "profile",
          children: <Profile />,
        },
        {
          label: (
            <TextWithIcon Icon={IoLockClosedOutline} text="Thay đổi mật khẩu" />
          ),
          key: "password",
          children: <ChangePassword />,
        },
      ]}
      style={{
        width: "80%",
        backgroundColor: "#fff",
        margin: "3rem auto",
        border: "1px solid var(--color-grey-dark-1)",
        borderRadius: "8px",
      }}
      onChange={(key) => {
        navigate(`/settings/${key}`);
      }}
      defaultActiveKey={props.mode}
    />
  );
};

export default Settings;
