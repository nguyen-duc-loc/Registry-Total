import { Button, Form, Input } from "antd";
import { useSignIn } from "react-auth-kit";
import { useNavigate } from "react-router-dom";

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const Login = () => {
  const signIn = useSignIn();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log("Success:", values);

    const authData = {
      email: values.username,
      password: values.password,
    };

    try {
      const response = await fetch(
        "https://sleepy-coast-93816.herokuapp.com/api/v1/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(authData),
        }
      );

      if (!response.ok) {
        throw new Error("Cannot fetch");
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
        console.log("login");
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
