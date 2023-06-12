import { Form, Input, Button, ConfigProvider } from "antd";
import { useState } from "react";

import classes from "./../../styles/Authentication/Reset.module.css";
import { useSignIn } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { IoLockClosedOutline } from "react-icons/io5";

const NewPassword = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const signIn = useSignIn();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/users/resetPassword/${
          props.tokenReset
        }`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (!response.ok) {
        setIsSubmitting(false);
        throw new Error("Could not authenticate.");
      }

      const res = await response.json();

      if (
        signIn({
          token: res.token,
          expiresIn: 480,
          tokenType: "Bearer",
          authState: {
            data: res.data.user,
          },
        })
      ) {
        navigate("/");
      }
    } catch (err) {
      setIsSubmitting(false);
      if (import.meta.env.VITE_ENV === "development") console.error(err);
    }
  };

  return (
    <Form name="reset" onFinish={onFinish}>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Hãy nhập mật khẩu mới",
          },
        ]}
      >
        <Input.Password
          prefix={<IoLockClosedOutline className={classes.icon} />}
          placeholder="Mật khẩu mới"
          type="password"
          autoComplete="off"
          size="large"
          className={classes.input}
          style={{ paddingLeft: ".4rem" }}
        />
      </Form.Item>

      <Form.Item
        name="passwordConfirm"
        dependencies={["password"]}
        rules={[
          {
            required: true,
            message: "Hãy nhập lại mật khẩu",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Mật khẩu không trùng khớp"));
            },
          }),
        ]}
      >
        <Input.Password
          prefix={<IoLockClosedOutline className={classes.icon} />}
          placeholder="Nhập lại mật khẩu mới"
          type="password"
          autoComplete="off"
          size="large"
          className={classes.input}
          style={{ paddingLeft: ".4rem" }}
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className={classes.button}
          size="large"
          loading={isSubmitting}
          style={{ fontSize: "1.6rem" }}
          disabled={isSubmitting}
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

export default NewPassword;
