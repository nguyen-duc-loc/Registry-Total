import {
  Avatar,
  Button,
  Card,
  ConfigProvider,
  Descriptions,
  Space,
  Form,
  Modal,
  Input,
  notification,
  message,
  Skeleton,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useAuthHeader } from "react-auth-kit";
import avatar from "./../../../assets/images/avatar.png";
import classes from "./../../../styles/Content/Settings/Profile.module.css";
import { useEffect, useState } from "react";
import validateDate from "validate-date";

const processBirthDate = (birthDate) => {
  const [month, day, year] = new Date(birthDate)
    .toLocaleDateString()
    .split("/");
  return [day, month, year].join("/");
};

const setRule = (name) => {
  return [
    {
      required: true,
      validator(_, value) {
        if (value) {
          if (name === "phone") {
            if (value[0] === "0" && value.match("[0-9]{10}")) {
              return Promise.resolve();
            }
            return Promise.reject(new Error("Số điện thoại không hợp lệ"));
          } else if (name === "birthDate") {
            let isValid = true;
            let [date, month, year] = value.split("/");
            const birth = new Date([year, month, date].join("-"));
            const now = new Date();
            if (birth > now) isValid = false;
            else {
              if (date) date = date.padStart(2, "0");
              if (month) month = month.padStart(2, "0");
              if (year) year = year.padStart(4, "0");
              if (
                !validateDate(
                  [date, month, year].join("/"),
                  "boolean",
                  "dd/mm/yyyy"
                )
              ) {
                isValid = false;
              }
            }
            if (isValid) return Promise.resolve();
            return Promise.reject(new Error("Ngày sinh không hợp lệ"));
          } else {
            if (value.trim().length !== 0) {
              return Promise.resolve();
            }
            return Promise.reject(new Error("Trường này không được để trống!"));
          }
        } else {
          return Promise.reject(new Error("Trường này không được để trống!"));
        }
      },
    },
  ];
};

const Profile = () => {
  const [form] = Form.useForm();
  const authHeader = useAuthHeader();
  const [open, setOpen] = useState(false);
  const [notificationApi, notificationContextHolder] =
    notification.useNotification();
  const [messageApi, messageContextHolder] = message.useMessage();
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    ssn: "",
    dateOfBirth: "",
    name: "",
    phone: "",
    email: "",
    workFor: {
      name: "",
      address: "",
      phone: "",
      email: "",
    },
    role: "staff",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://sleepy-coast-93816.herokuapp.com/api/v1/users/getMe`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: authHeader(),
            },
          }
        );

        if (!response.ok) {
          throw new Error("Can not get.");
        }

        const res = await response.json();
        setUser(res.data.user);
        setLoading(false);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchData();
  }, []);

  const openErrorNotification = () => {
    notificationApi["error"]({
      message: "Lỗi",
      description: "Không thể chỉnh sửa thông tin.",
      placement: "bottomLeft",
    });
  };

  const openMessage = () => {
    messageApi.open({
      type: "success",
      content: "Chỉnh sửa thành công.",
    });
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          paddingLG: 22,
          colorBorderSecondary: "var(--color-grey-dark-1)",
          colorPrimary: "#1677ff",
          colorBgContainerDisabled: "#4096ff",
          colorTextDisabled: "#fff",
        },
      }}
    >
      {notificationContextHolder}
      {messageContextHolder}
      <h1 className={classes.title}>Hồ sơ của tôi</h1>
      <Skeleton
        loading={loading}
        style={{ padding: "3rem" }}
        avatar
        active
        round
      />
      {!loading && (
        <Space
          direction="vertical"
          size="large"
          style={{
            display: "flex",
            padding: "3rem",
          }}
        >
          <Card>
            <Space size="large">
              <Avatar src={avatar} size={100} />
              <Space direction="vertical" size="small">
                <span className={classes.name}>{user.name}</span>
                <span className={classes.role}>
                  {user.role === "staff" ? "Nhân viên" : "Quản trị viên"}
                </span>
                <span className={classes.address}>
                  {user.workFor.address}, Việt Nam
                </span>
              </Space>
            </Space>
          </Card>
          <Card
            title="Thông tin cá nhân"
            extra={
              <Button
                size="middle"
                shape="round"
                icon={<EditOutlined />}
                onClick={() => {
                  setOpen(true);
                }}
              />
            }
          >
            <Descriptions
              layout="vertical"
              labelStyle={{
                color: "var(--color-grey-dark-3)",
              }}
              contentStyle={{ paddingBottom: "16px", fontWeight: "500" }}
              colon={false}
              column={{
                sm: 2,
                xs: 1,
              }}
            >
              <Descriptions.Item label="Họ và tên">
                {user.name}
              </Descriptions.Item>
              <Descriptions.Item label="Ngày sinh">
                {processBirthDate(user.dateOfBirth)}
              </Descriptions.Item>
              <Descriptions.Item label="Số điện thoại">
                +84 {user.phone}
              </Descriptions.Item>
              <Descriptions.Item label="Số căn cước công dân">
                {user.ssn}
              </Descriptions.Item>
              <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
            </Descriptions>
          </Card>
          <Card title="Địa chỉ làm việc">
            <Descriptions
              layout="vertical"
              labelStyle={{
                color: "var(--color-grey-dark-3)",
              }}
              contentStyle={{ paddingBottom: "16px", fontWeight: "500" }}
              colon={false}
              column={{
                sm: 2,
                xs: 1,
              }}
            >
              <Descriptions.Item label="Quốc gia">Việt Nam</Descriptions.Item>
              <Descriptions.Item label="Tỉnh / Thành phố">
                {user.workFor.address}
              </Descriptions.Item>
              <Descriptions.Item label="Số điện thoại">
                +84 {user.workFor.phone}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {user.workFor.email}
              </Descriptions.Item>
              <Descriptions.Item label="Tên trung tâm">
                {user.workFor.name}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Space>
      )}
      <Modal
        open={open}
        title="Chỉnh sửa thông tin cá nhân"
        cancelText="Hủy"
        onCancel={() => {
          setOpen(false);
        }}
        okButtonProps={{ loading: submitting, disabled: submitting }}
        okText={submitting ? "Đang cập nhật..." : "Chỉnh sửa"}
        onOk={async () => {
          try {
            setSubmitting(true);

            const values = await form.validateFields();

            const datas = {
              name: values.name,
              email: values.email,
              phone: values.phone,
              dateOfBirth: values.birthDate.split("/").reverse().join("-"),
            };

            const response = await fetch(
              `https://sleepy-coast-93816.herokuapp.com/api/v1/users/updateMe`,
              {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: authHeader(),
                },
                body: JSON.stringify(datas),
              }
            );

            if (!response.ok) {
              openErrorNotification();
              setSubmitting(false);

              throw new Error("An error occured");
            }

            const newUser = user;
            newUser.name = datas.name;
            newUser.dateOfBirth = datas.dateOfBirth;
            newUser.email = datas.email;
            newUser.phone = datas.phone;

            setUser(newUser);

            setOpen(false);
            setSubmitting(false);
            openMessage();
            form.resetFields();
          } catch (info) {
            console.log("Validate Failed:", info);
          }
        }}
      >
        <Form
          form={form}
          name="update_form"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            name: user.name,
            birthDate: processBirthDate(user.dateOfBirth),
            phone: user.phone,
            email: user.email,
          }}
        >
          <Form.Item
            name="name"
            label="Họ và tên"
            style={{ marginTop: "2rem" }}
            rules={setRule("name")}
          >
            <Input maxLength={100} />
          </Form.Item>
          <Form.Item
            name="birthDate"
            label="Ngày sinh"
            rules={setRule("birthDate")}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={setRule("phone")}
          >
            <Input maxLength={10} />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: "true",
                message: "Trường này không được để trống",
              },
              {
                type: "email",
                message: "Email không hợp lệ",
              },
            ]}
          >
            <Input maxLength={100} />
          </Form.Item>
        </Form>
      </Modal>
    </ConfigProvider>
  );
};

export default Profile;
