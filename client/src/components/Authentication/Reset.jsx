import { Steps, ConfigProvider, notification } from "antd";
import { useState } from "react";
import FindEmail from "./FindEmail";
import classes from "./../../styles/Authentication/Reset.module.css";
import Verify from "./Vefiry";
import NewPassword from "./NewPassword";

const steps = [
  {
    title: "Tìm kiếm",
    content: "find",
  },
  {
    title: "Xác thực",
    content: "authenticate",
  },
  {
    title: "Đặt lại mật khẩu",
    content: "reset",
  },
];

const ResetForm = (props) => {
  const [findingEmail, setFindingEmail] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [current, setCurrent] = useState(0);
  const [api, contextHolder] = notification.useNotification();
  const [tokenReset, setTokenReset] = useState("");

  const openNotification = (message, description) => {
    api["error"]({
      message: message,
      description: description,
    });
  };

  const next = () => {
    setCurrent((current) => current + 1);
  };

  const turnOffForgotMode = () => {
    props.turnOffForgotMode();
  };

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  return (
    <div className={classes.reset}>
      {contextHolder}
      <Steps progressDot size="small" current={current} items={items} />
      <h1 className={classes.title}>
        {findingEmail && "Hãy bắt đầu bằng cách tìm kiếm email của bạn"}
        {verifying && "Hãy kiểm tra hòm thư của bạn nhé"}
        {resetting && "Thiết lập lại mật khẩu"}
      </h1>
      <ConfigProvider
        theme={{
          token: {
            colorBgContainer: "#F1F6F5",
            borderRadius: "10px",
            controlHeight: "34",
            colorBgContainerDisabled: "#4096ff",
            colorTextDisabled: "#fff",
            colorErrorOutline: "none",
            controlOutline: "none",
          },
        }}
      >
        <div style={{ width: "70%" }}>
          {findingEmail && (
            <FindEmail
              turnOffForgotMode={turnOffForgotMode}
              setFindingEmail={setFindingEmail}
              setVerifying={setVerifying}
              next={next}
              openNotification={openNotification}
            />
          )}

          {verifying && (
            <Verify
              turnOffForgotMode={turnOffForgotMode}
              setVerifying={setVerifying}
              setResetting={setResetting}
              next={next}
              openNotification={openNotification}
              setTokenReset={setTokenReset}
            />
          )}

          {resetting && (
            <NewPassword
              turnOffForgotMode={turnOffForgotMode}
              tokenReset={tokenReset}
            />
          )}
        </div>
      </ConfigProvider>
    </div>
  );
};
export default ResetForm;
