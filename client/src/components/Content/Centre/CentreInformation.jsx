import {
  Button,
  Descriptions,
  Popconfirm,
  Skeleton,
  Space,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { useAuthHeader } from "react-auth-kit";
import TextWithIcon from "../../UI/TextWithIcon";
import {
  IoCallOutline,
  IoConstructOutline,
  IoDocumentTextOutline,
  IoLocationOutline,
  IoMailOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import CentreModal from "./CentreModal";

const CentreInformation = (props) => {
  const authHeader = useAuthHeader();
  const [centreName, setCentreName] = useState("");
  const [centreAddress, setCentreAddress] = useState("");
  const [centrePhone, setCentrePhone] = useState("");
  const [centreEmail, setCentreEmail] = useState("");
  const [centreDescription, setCentreDescription] = useState("");
  const [centreNumberOfStaffs, setCentreNumberOfStaffs] = useState(0);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [provinces, setProvinces] = useState([]);

  const openMessage = (type, content) => {
    messageApi.open({
      type: type,
      content: content,
    });
  };

  useEffect(() => {
    document.title = "Xem trung tâm";

    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/v1/registrationCentres/${
            props.centreId
          }`,
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
        setCentreName(res.data.data.name);
        setCentreAddress(res.data.data.address);
        setCentrePhone(res.data.data.phone);
        setCentreEmail(res.data.data.email);
        setCentreDescription(res.data.data.description);
        setCentreNumberOfStaffs(res.data.data.employees.length);

        setLoading(false);
      } catch (err) {
        setLoading(false);
        props.setError(true);
        if (import.meta.env.VITE_ENV === "development") console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: "2rem 3.2rem 0" }}>
      {contextHolder}
      <Skeleton loading={loading} active>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <CentreModal
            open={open}
            setOpen={setOpen}
            provinces={provinces}
            mode="edit"
            initialValues={{
              name: centreName.replace("Trung tâm đăng kiểm", "").trimStart(),
              phone: centrePhone,
              email: centreEmail,
              address: centreAddress,
              description: centreDescription,
            }}
            centreId={props.centreId}
            setCentreName={setCentreName}
            setCentreAddress={setCentreAddress}
            setCentrePhone={setCentrePhone}
            setCentreDescription={setCentreDescription}
            setCentreEmail={setCentreEmail}
          />
          <Descriptions bordered column={1}>
            <Descriptions.Item
              label={
                <TextWithIcon Icon={IoConstructOutline} text="Tên trung tâm" />
              }
            >
              {centreName}
            </Descriptions.Item>
            <Descriptions.Item
              label={<TextWithIcon Icon={IoLocationOutline} text="Địa chỉ" />}
            >
              {centreAddress}
            </Descriptions.Item>
            <Descriptions.Item
              label={<TextWithIcon Icon={IoCallOutline} text="Số điện thoại" />}
            >
              {centrePhone}
            </Descriptions.Item>
            <Descriptions.Item
              label={<TextWithIcon Icon={IoMailOutline} text="Email" />}
            >
              {centreEmail}
            </Descriptions.Item>
            <Descriptions.Item
              label={<TextWithIcon Icon={IoDocumentTextOutline} text="Mô tả" />}
            >
              {centreDescription}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <TextWithIcon
                  Icon={IoPersonOutline}
                  text="Số lượng nhân viên"
                />
              }
            >
              {centreNumberOfStaffs}
            </Descriptions.Item>
          </Descriptions>

          <Space size="middle">
            <Button
              icon={<EditOutlined />}
              onClick={async () => {
                setOpen(true);

                const response = await fetch(
                  `${
                    import.meta.env.VITE_BASE_URL
                  }/api/v1/utils/provinces?fields=province`,
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

                setProvinces(res.data.data.map((d) => d.province));
              }}
            >
              Chỉnh sửa
            </Button>
            <Popconfirm
              title="Xóa trung tâm"
              description="Bạn có chắc chắn muốn xóa trung tâm này?"
              okText={deleting ? "Đang xóa..." : "Tiếp tục"}
              cancelText="Hủy"
              okButtonProps={{ loading: deleting }}
              cancelButtonProps={{ disabled: deleting }}
              onConfirm={async () => {
                try {
                  setDeleting(true);

                  const response = await fetch(
                    `${
                      import.meta.env.VITE_BASE_URL
                    }/api/v1/registrationCentres/deactivateCentre/${
                      props.centreId
                    }`,
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

                  setDeleting(false);

                  openMessage("success", "Xóa trung tâm thành công");

                  navigate(-1);
                } catch (err) {
                  setDeleting(false);
                  openMessage("error", "Không thể xóa trung âm");
                  if (import.meta.env.VITE_ENV === "development")
                    console.error(err);
                }
              }}
            >
              <Button danger type="primary" icon={<DeleteOutlined />}>
                Xóa trung tâm
              </Button>
            </Popconfirm>
          </Space>
        </div>
      </Skeleton>
    </div>
  );
};

export default CentreInformation;
