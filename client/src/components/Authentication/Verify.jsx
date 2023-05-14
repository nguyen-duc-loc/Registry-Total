import { Form, Input, Button, ConfigProvider } from "antd";
import { useState } from "react";

import classes from "./../../styles/Authentication/Reset.module.css";

const Verify = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFinish = async (values) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(
        `https://sleepy-coast-93816.herokuapp.com/api/v1/users/checkResetToken`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (!response.ok) {
        props.openNotification("Lỗi", "Mã xác thực không chính xác.");
        props.setStatus("error");
        setIsSubmitting(false);
        throw new Error("Could not authenticate.");
      }

      props.setStatus("finish");
      props.setTokenReset(values.token);
      props.setVerifying(false);
      props.setResetting(true);
      props.next();
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Form name="verify-token" onFinish={onFinish}>
      <Form.Item
        name="token"
        rules={[
          {
            required: true,
            message: "Hãy nhập mã xác thực",
          },
        ]}
      >
        <Input.Password
          placeholder="Mã xác thực"
          type="password"
          autoComplete="off"
          size="large"
          className={classes.input}
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className={classes.button}
          size="large"
          disabled={isSubmitting}
          style={{ fontSize: "1.6rem" }}
        >
          Tiếp tục
        </Button>
        <ConfigProvider
          theme={{
            token: {
              colorBgContainerDisabled: "rgba(0, 0, 0, 0.04)",
              colorTextDisabled: "rgba(0, 0, 0, 0.25)",
            },
          }}
        >
          <Button
            htmlType="button"
            className={classes.button}
            style={{ height: "4.2rem" }}
            disabled={isSubmitting}
            onClick={() => {
              props.turnOffForgotMode();
            }}
          >
            Trở về đăng nhập
          </Button>
        </ConfigProvider>
      </Form.Item>
    </Form>
  );
};

export default Verify;