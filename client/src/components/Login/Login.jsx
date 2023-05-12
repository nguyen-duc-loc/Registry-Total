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
import classes from "./../../styles/Login/Login.module.css";
import { useState } from "react";
import { useSignIn } from "react-auth-kit";

const currentYear = new Date().getFullYear();

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [buttonText, setButtonText] = useState("Đăng nhập");
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
    setButtonText("Đang đăng nhập...");

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
        setButtonText("Đăng nhập");
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
        },
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div className={classes.form}>
          {contextHolder}
          <h1 className={classes.title}>Welcome back!</h1>
          <Form
            name="normal_login"
            className={classes.login}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "⛔ Hãy điền email",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined className={classes.icon} />}
                placeholder="Email"
                type="email"
                size="large"
                className={classes.input}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "⛔ Hãy nhập mật khẩu",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className={classes.icon} />}
                type="password"
                size="large"
                placeholder="Mật khẩu"
                className={classes.input}
              />
            </Form.Item>

            <Form.Item style={{ justifyContent: "end" }}>
              <Typography.Text strong className={classes.forgot}>
                Quên mật khẩu?
              </Typography.Text>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className={classes.button}
                size="large"
                disabled={isSubmitting}
              >
                {buttonText}
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className={classes.copy}>
          &copy; {currentYear} allright reserved
        </div>
      </div>
    </ConfigProvider>
  );
};
export default Login;
