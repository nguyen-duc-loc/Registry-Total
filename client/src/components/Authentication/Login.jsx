import { LockOutlined, MailOutlined } from "@ant-design/icons";
import {
  Button,
  ConfigProvider,
  Form,
  Input,
  Typography,
  notification,
} from "antd";
import { useNavigate } from "react-router-dom";
import classes from "./../../styles/Authentication/Login.module.css";
import { useState } from "react";
import { useSignIn } from "react-auth-kit";

const LoginForm = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [api, contextHolder] = notification.useNotification();
  const signIn = useSignIn();
  const navigate = useNavigate();

  const openNotification = () => {
    api["error"]({
      message: "Lỗi",
      description: "Thông tin đăng nhập không chính xác.",
    });
  };

  const onFinish = async (values) => {
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `https://sleepy-coast-93816.herokuapp.com/api/v1/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (!response.ok) {
        openNotification();
        setIsSubmitting(false);

        throw new Error("Can not authenticate.");
      }

      const res = response.json();

      if (
        signIn({
          token: res.token,
          expiresIn: 480,
          tokenType: "Bearer",
          authState: {
            data: res.data,
          },
        })
      ) {
        navigate("/");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
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
      <div className={classes.form}>
        {contextHolder}
        <h1 className={classes.title}>Welcome back!</h1>
        <Form name="login" className={classes.login} onFinish={onFinish}>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Hãy nhập email",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined className={classes.icon} />}
              placeholder="Email"
              type="email"
              autoComplete="off"
              size="large"
              className={classes.input}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Hãy nhập mật khẩu",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className={classes.icon} />}
              type="password"
              size="large"
              placeholder="Mật khẩu"
              autoComplete="off"
              className={classes.input}
            />
          </Form.Item>

          <Form.Item>
            <Typography.Link
              onClick={() => props.turnOnForgotMode()}
              className={classes.forgot}
            >
              Quên mật khẩu?
            </Typography.Link>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={classes.button}
              size="large"
              loading={isSubmitting}
              disabled={isSubmitting}
              style={{ fontSize: "1.6rem" }}
            >
              {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </ConfigProvider>
  );
};
export default LoginForm;
