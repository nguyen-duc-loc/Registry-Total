import {
  Button,
  Popconfirm,
  Skeleton,
  Table,
  message,
  Form,
  Modal,
  Input,
} from "antd";
import { useState, useEffect } from "react";
import { useAuthHeader } from "react-auth-kit";
import { IoAddCircleOutline, IoTrashOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";
import TextWithIcon from "../../UI/TextWithIcon";
import validateDate from "validate-date";

const processDate = (date) => {
  if (!date) return;
  const [month, day, year] = new Date(date).toLocaleDateString().split("/");
  return [day.padStart(2, "0"), month.padStart(2, "0"), year].join("/");
};

const StaffInformation = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const authHeader = useAuthHeader();
  const { centreId } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const [deleting, setDeleting] = useState(false);
  const [form] = Form.useForm();
  const [adding, setAdding] = useState(false);
  const [open, setOpen] = useState(false);

  const openMessage = (type, content) => {
    messageApi.open({
      type: type,
      content: content,
    });
  };

  const columns = [
    {
      title: "Họ và tên",
      dataIndex: "name",
      key: "name",
      width: "25%",
      align: "center",
    },
    {
      title: "Ngày sinh",
      dataIndex: "birth",
      key: "birth",
      width: "15%",
      align: "center",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      width: "15%",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "25%",
      align: "center",
    },
    {
      dataIndex: "",
      key: "x",
      width: "5%",
      align: "center",
      render: (record) => (
        <Popconfirm
          title="Xóa nhân viên"
          description="Bạn có chắc chắn muốn xóa nhân viên này?"
          okText={deleting ? "Đang xóa" : "Xóa"}
          okButtonProps={{ loading: deleting }}
          cancelButtonProps={{ disabled: deleting }}
          cancelText="Hủy"
          onConfirm={async () => {
            try {
              setDeleting(true);

              const response = await fetch(
                `${
                  import.meta.env.VITE_BASE_URL
                }/api/v1/users/deactivateAccount/${record.key}`,
                {
                  method: "DELETE",
                  headers: {
                    Authorization: authHeader(),
                  },
                }
              );

              if (!response.ok) {
                throw new Error("Can not delete.");
              }

              openMessage("success", `Xóa thành công nhân viên ${record.name}`);

              const oldEmployees = employees;
              setEmployees(oldEmployees.filter((e) => e.key != record.key));
              setDeleting(false);
            } catch (err) {
              openMessage("error", `Không thể xóa nhân viên ${record.name}`);
              setDeleting(false);
              console.error(err);
            }
          }}
        >
          <Button danger type="text">
            <IoTrashOutline style={{ verticalAlign: "middle" }} />
          </Button>
        </Popconfirm>
      ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${
            import.meta.env.VITE_BASE_URL
          }/api/v1/registrationCentres/${centreId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: authHeader(),
            },
          }
        );

        if (!response.ok) {
          throw new Error("Can not fetch.");
        }

        const res = await response.json();

        setEmployees(
          res.data.data.employees
            .map((d) => {
              return {
                key: d.id,
                name: d.name,
                birth: processDate(d.dateOfBirth),
                phone: d.phone,
                email: d.email,
              };
            })
            .sort((a, b) => a.email.localeCompare(b.email))
        );

        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: "2rem 3.2rem 0" }}>
      {contextHolder}
      <Skeleton loading={loading} active>
        <Modal
          title="Thêm một nhân viên mới"
          onCancel={() => {
            form.resetFields();
            setOpen(false);
          }}
          onOk={async () => {
            try {
              setAdding(true);

              const values = await form.validateFields();

              const newStaff = {
                name: values.name,
                phone: values.phone,
                email: values.email,
                dateOfBirth: values.dateOfBirth.split("/").reverse().join("-"),
                ssn: values.ssn,
                workFor: centreId,
              };

              console.log(newStaff);

              const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}/api/v1/users/createAccount`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: authHeader(),
                  },
                  body: JSON.stringify(newStaff),
                }
              );

              const res = await response.json();

              if (!response.ok) {
                const message = res.message
                  .replace("ssn", "Mã CCCD")
                  .replace("slug", "Tên trung tâm")
                  .replace("phone", "Số điện thoại");

                openMessage(
                  "error",
                  message.charAt(0).toUpperCase().concat(message.slice(1))
                );
                throw new Error("There was an error.");
              }

              const oldEmployees = employees;

              const newEmployeeData = res.data.data;

              setEmployees([
                {
                  key: newEmployeeData._id,
                  name: newEmployeeData.name,
                  birth: processDate(newEmployeeData.dateOfBirth),
                  phone: newEmployeeData.phone,
                  email: newEmployeeData.email,
                },
                ...oldEmployees,
              ]);

              openMessage("success", res.message);

              setOpen(false);
              setAdding(false);

              form.resetFields();
            } catch (err) {
              setAdding(false);
              console.error(err);
            }
          }}
          open={open}
          okText={adding ? "Đang thêm..." : "Thêm"}
          okButtonProps={{ loading: adding }}
          cancelText="Hủy"
          cancelButtonProps={{ disabled: adding }}
        >
          <Form
            form={form}
            name="staff_form"
            labelCol={{
              span: 6,
            }}
          >
            <Form.Item
              name="name"
              label="Tên nhân viên"
              style={{ marginTop: "2rem" }}
              rules={[
                {
                  required: true,
                  message: "Trường này không được để trống!",
                },
              ]}
            >
              <Input maxLength={100} />
            </Form.Item>
            <Form.Item
              name="ssn"
              label="Mã CCCD"
              style={{ marginTop: "2rem" }}
              rules={[
                {
                  required: true,
                  message: "Trường này không được để trống!",
                },
              ]}
            >
              <Input maxLength={12} />
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
              <Input maxLength={10} />
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
              <Input placeholder="abc@vr.com.vn" maxLength={100} />
            </Form.Item>
            <Form.Item
              name="dateOfBirth"
              label="Ngày sinh"
              rules={[
                {
                  required: true,
                  validator(_, value) {
                    if (value) {
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
                      return Promise.reject(
                        new Error("Ngày sinh không hợp lệ")
                      );
                    } else {
                      if (value.trim().length !== 0) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Trường này không được để trống!")
                      );
                    }
                  },
                },
              ]}
            >
              <Input placeholder="dd/mm/yyyy" maxLength={10} />
            </Form.Item>
          </Form>
        </Modal>
        <Table
          columns={columns}
          dataSource={employees}
          scroll={{ x: 660 }}
          pagination={false}
          footer={() => (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                justifyContent: "center",
              }}
            >
              <Button
                type="dashed"
                shape="round"
                size="large"
                onClick={() => setOpen(true)}
              >
                <TextWithIcon Icon={IoAddCircleOutline} text="Thêm nhân viên" />
              </Button>
            </div>
          )}
        />
      </Skeleton>
    </div>
  );
};
export default StaffInformation;
