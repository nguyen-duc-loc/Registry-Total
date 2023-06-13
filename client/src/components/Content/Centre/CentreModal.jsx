import { Form, Modal, Input, Select, notification } from "antd";
import { useState } from "react";
import { useAuthHeader } from "react-auth-kit";
import { useNavigate } from "react-router-dom";

const CentreModal = (props) => {
  const authHeader = useAuthHeader();
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  const openNotification = (type, message, description) => {
    api[type]({
      message: message,
      description: description,
    });
  };

  return (
    <>
      {contextHolder}
      <Modal
        title={
          props.mode === "edit"
            ? "Chỉnh sửa trung tâm"
            : "Thêm một trung tâm mới"
        }
        onCancel={() => {
          form.resetFields();
          props.setOpen(false);
        }}
        onOk={async () => {
          try {
            setSubmitting(true);

            const values = await form.validateFields();

            const newCentre = {
              name: `Trung tâm đăng kiểm ${values.name.trim()}`,
              phone: values.phone,
              email: values.email,
              address: values.address,
              description: values.description,
            };

            const response = await fetch(
              `${import.meta.env.VITE_BASE_URL}/api/v1/registrationCentres/${
                props.mode === "edit" ? props.centreId : ""
              }`,
              {
                method: props.mode === "edit" ? "PATCH" : "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: authHeader(),
                },
                body: JSON.stringify(newCentre),
              }
            );

            const res = await response.json();
            if (!response.ok) {
              const message = res.message
                .replace("name", "Tên trung tâm")
                .replace("slug", "Tên trung tâm")
                .replace("phone", "Số điện thoại");

              openNotification(
                "error",
                "Lỗi",
                message.charAt(0).toUpperCase().concat(message.slice(1))
              );
              throw new Error("There was an error.");
            }

            const newData = res.data.data;

            if (props.mode === "edit") {
              props.setCentreName(newData.name);
              props.setCentrePhone(newData.phone);
              props.setCentreAddress(newData.address);
              props.setCentreEmail(newData.email);
              props.setCentreDescription(newData.description);
            }

            props.setOpen(false);
            setSubmitting(false);
            if (props.mode === "add") navigate(`/centres/${res.data.data.id}`);
            form.resetFields();
          } catch (err) {
            setSubmitting(false);
            if (import.meta.env.VITE_ENV === "development") console.error(err);
          }
        }}
        open={props.open}
        okText={
          submitting
            ? props.mode === "edit"
              ? "Đang chỉnh sửa"
              : "Đang tạo trung tâm"
            : props.mode === "edit"
            ? "Chỉnh sửa"
            : "Tạo trung tâm"
        }
        okButtonProps={{ loading: submitting }}
        cancelText="Hủy"
        cancelButtonProps={{ disabled: submitting }}
      >
        <Form
          form={form}
          name="centre_form"
          labelCol={{
            span: 6,
          }}
          layout="vertical"
          initialValues={props.mode === "edit" && props.initialValues}
        >
          <Form.Item
            name="name"
            label="Tên trung tâm"
            style={{ marginTop: "2rem" }}
            rules={[
              {
                required: true,
                message: "Trường này không được để trống!",
              },
            ]}
          >
            <Input
              addonBefore="Trung tâm đăng kiểm"
              maxLength={100}
              allowClear
            />
          </Form.Item>
          <Form.Item
            name="address"
            label="Địa chỉ"
            rules={[
              {
                required: true,
                message: "Trường này không được để trống!",
              },
            ]}
          >
            <Select
              showSearch
              allowClear
              placeholder="Chọn tỉnh/thành phố"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.title.toUpperCase().includes(input.toUpperCase())
              }
              filterSort={(optionA, optionB) =>
                optionA.title
                  .toLowerCase()
                  .localeCompare(optionB.title.toLowerCase())
              }
              options={props.provinces
                .map((province) => {
                  return { value: province, title: province };
                })
                .sort((a, b) => {
                  return a.value.localeCompare(b.value);
                })}
            />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[
              {
                required: true,
                message: "Trường này không được để trống!",
              },
            ]}
          >
            <Input maxLength={10} allowClear />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            type="email"
            rules={[
              {
                required: true,
                message: "Trường này không được để trống!",
              },
            ]}
          >
            <Input maxLength={100} allowClear />
          </Form.Item>
          <Form.Item name="description" label="Mô tả">
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CentreModal;
