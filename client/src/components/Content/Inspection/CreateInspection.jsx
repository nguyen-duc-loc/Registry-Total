import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Result,
  Row,
  Space,
  Steps,
  message,
} from "antd";
import { useState } from "react";
import classes from "./../../../styles/Content/Inspection/CreateInspection.module.css";
import {
  IoCloseOutline,
  IoCloudDoneOutline,
  IoReturnUpBackOutline,
  IoSearchOutline,
  IoShieldCheckmarkOutline,
} from "react-icons/io5";
import image from "./../../../assets/images/search-2.svg";
import { useAuthHeader } from "react-auth-kit";
import ViewCar from "../Car/ViewCar";
import TextWithIcon from "../../UI/TextWithIcon";
import { useNavigate } from "react-router-dom";

const steps = [
  {
    title: "Tìm kiếm phương tiện",
    icon: <IoSearchOutline />,
  },
  {
    title: "Đăng kiểm phương tiện",
    icon: <IoShieldCheckmarkOutline />,
  },
  {
    title: "Hoàn tất",
    icon: <IoCloudDoneOutline />,
  },
];

const stepItems = steps.map((item, index) => ({
  key: index,
  ...item,
}));

const InputBox = ({ type, label, name, addonAfter, placeholder }) => {
  return (
    <Col xl={8} md={12} xs={24}>
      <Form.Item
        label={type !== "checkbox" && label}
        name={name}
        rules={
          type !== "checkbox" && [
            {
              required: true,
              message: "Trường này không được để trống!",
            },
          ]
        }
        valuePropName={type === "checkbox" ? "checked" : "value"}
      >
        {type === "number" && (
          <InputNumber addonAfter={addonAfter} style={{ width: "100%" }} />
        )}
        {type === "checkbox" && (
          <Checkbox>{type === "checkbox" && label}</Checkbox>
        )}
        {!type && <Input addonAfter={addonAfter} placeholder={placeholder} />}
      </Form.Item>
    </Col>
  );
};

const inputItems = [
  {
    label: "Công thức bánh xe",
    name: "wheelFormula",
    placeholder: "VD: 6x6",
  },
  {
    type: "number",
    label: "Vết bánh xe",
    name: "wheelTread",
    addonAfter: "mm",
  },
  {
    label: "Kích thước bao",
    name: "overallDimension",
    addonAfter: "mm",
    placeholder: "VD: 4288 x 1535 x 1485",
  },
  {
    label: "Kích thước lòng thùng xe",
    name: "containerDimension",
    addonAfter: "mm",
    placeholder: "VD: 2495 x 1423 x 1110",
  },
  {
    type: "number",
    label: "Chiều dài cơ sở",
    name: "lengthBase",
    addonAfter: "mm",
  },
  {
    type: "number",
    label: "Khối lượng bản thân",
    name: "kerbMass",
    addonAfter: "kg",
  },
  {
    label: "Khối lượng hàng CC theo TK/CP TGGT",
    name: "designedAndAuthorizedPayload",
    addonAfter: "kg",
    placeholder: "VD: 531/700",
  },
  {
    label: "Khối lượng toàn bộ theo TK/CP TGGT",
    name: "designedAndAuthorizedTotalMass",
    addonAfter: "kg",
    placeholder: "VD: 2964/2914",
  },
  {
    label: "Khối lượng kéo theo TK/CP TGGT",
    name: "designedAndAuthorizedTowedMass",
    addonAfter: "kg",
    placeholder: "VD: 1899/1679",
  },
  {
    type: "number",
    label: "Số lượng người cho phép chở",
    name: "permissibleCarry",
  },
  {
    type: "number",
    label: "Thể tích làm việc của động cơ",
    name: "engineDisplacement",
    addonAfter: (
      <span>
        cm<sup>3</sup>
      </span>
    ),
  },
  {
    label: "Công suất lớn nhất/tốc độ quay",
    name: "maximumOutputToRpmRatio",
    placeholder: "VD: 130kW/6333vph",
  },
  { label: "Loại nhiên liệu", name: "fuel" },
  {
    type: "number",
    label: "Số lượng lốp",
    name: "numberOfTires",
    addonAfter: "lốp",
  },
  { label: "Cỡ lốp/trục", name: "tireSize", placeholder: "VD: 225/65 R17" },
  {
    type: "checkbox",
    label: "Kinh doanh vận tải",
    name: "business",
  },
  {
    type: "checkbox",
    label: "Cải tạo",
    name: "recovered",
  },
];

const CreateInspection = () => {
  const [current, setCurrent] = useState(0);
  const [error, setError] = useState(false);
  const [found, setFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const authHeader = useAuthHeader();
  const [carId, setCarId] = useState("");
  const [inspectionId, setInspectionId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [carData, setCarData] = useState({
    numberPlate: "",
    registrationNumber: "",
    registrationDate: "",
    type: "",
    brand: "",
    modelCode: "",
    engineNumber: "",
    chassisNumber: "",
    color: "",
    manufacturedYear: "",
    manufacturedCountry: "",
    boughtPlace: "",
    purpose: "",
    recovered: "",
    inspected: "",
  });

  const [anotherData, setAnotherData] = useState({
    owner: {
      name: "",
      address: "",
      phone: "",
      email: "",
      role: "",
    },
    specification: {
      wheelFormula: "",
      wheelTread: "",
      overallDimension: "",
      containerDimension: "",
      lengthBase: "",
      kerbMass: "",
      designedAndAuthorizedPayload: "",
      designedAndAuthorizedTotalMass: "",
      designedAndAuthorizedTowedMass: "",
      permissibleCarry: "",
      fuel: "",
      engineDisplacement: "",
      maximumOutputToRpmRatio: "",
      numberOfTiresAndTireSize: "",
    },
  });

  const openMessage = (type, content) => {
    messageApi.open({
      type: type,
      content: content,
    });
  };

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const onFinish = async (values) => {
    try {
      setSubmitting(true);

      const data = {
        purpose: values.business ? "business" : "personal",
        specification: {
          wheelFormula: values.wheelFormula,
          wheelTread: `${values.wheelTread} (mm)`,
          overallDimension: `${values.overallDimension} (mm)`,
          containerDimension: `${values.containerDimension} (mm)`,
          lengthBase: `${values.lengthBase} (mm)`,
          kerbMass: `${values.kerbMass} (kg)`,
          designedAndAuthorizedPayload: `${values.designedAndAuthorizedPayload} (kg)`,
          designedAndAuthorizedTotalMass: `${values.designedAndAuthorizedTotalMass} (kg)`,
          designedAndAuthorizedTowedMass: `${values.designedAndAuthorizedTowedMass} (kg)`,
          permissibleCarry: values.permissibleCarry,
          fuel: values.fuel,
          engineDisplacement: `${values.engineDisplacement} (cm3)`,
          maximumOutputToRpmRatio: values.maximumOutputToRpmRatio,
          numberOfTiresAndTireSize: `${values.numberOfTires} tires, ${values.tireSize}`,
        },
        recovered: values.recovered,
      };

      const patchResponse = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/cars/${carId}/inspects`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: authHeader(),
          },
          body: JSON.stringify(data),
        }
      );

      const patchRes = await patchResponse.json();

      if (!patchResponse.ok) {
        openMessage("error", `Có lỗi xảy ra. ${patchRes.message}.`);
        throw new Error("Can not patch");
      }

      const postResponse = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/cars/${carId}/inspections`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: authHeader(),
          },
        }
      );

      const postRes = await postResponse.json();
      if (!postResponse.ok) {
        throw new Error("Can not post.");
      }

      setInspectionId(postRes.data.data.id);

      setSubmitting(false);

      next();
    } catch (err) {
      setSubmitting(false);
      if (import.meta.env.VITE_ENV === "development") console.error(err);
    }
  };

  return (
    <div className={classes.container}>
      {contextHolder}
      <Steps
        current={current}
        items={stepItems}
        className={classes.steps}
        size="small"
        labelPlacement="vertical"
        status={error ? "error" : "process"}
      />
      {current === 0 && (
        <>
          <Input.Search
            className={classes.search}
            loading={loading}
            allowClear
            enterButton
            size="large"
            placeholder="Nhập biển số xe"
            onChange={() => {
              setFound(false);
              setError(false);
            }}
            onSearch={async (value) => {
              try {
                setLoading(true);

                const response = await fetch(
                  `${
                    import.meta.env.VITE_BASE_URL
                  }/api/v1/cars/?numberPlate=${value.trim().toUpperCase()}`,
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

                setLoading(false);
                const res = await response.json();

                if (res.results === 0) {
                  throw new Error("No car found.");
                }

                const [data] = res.data.data;

                setCarId(data.id);

                setCarData({
                  numberPlate: data.numberPlate,
                  registrationNumber: data.registrationNumber,
                  registrationDate: data.registrationDate,
                  type: data.type,
                  brand: data.brand,
                  modelCode: data.modelCode,
                  engineNumber: data.engineNumber,
                  chassisNumber: data.chassisNumber,
                  color: data.color,
                  manufacturedYear: data.manufacturedYear,
                  manufacturedCountry: data.manufacturedCountry,
                  boughtPlace: data.boughtPlace,
                  purpose: data.purpose,
                  recovered: data.recovered,
                  inspected: data.inspected,
                });

                const { owner, specification } = data;

                setAnotherData({ owner, specification });

                setFound(true);
                setError(false);
                openMessage("success", "Đã tìm thấy phương tiện");
              } catch (err) {
                setError(true);
                setLoading(false);
                openMessage("error", "Không tìm thấy phương tiện");
              }
            }}
            status={error && "error"}
          />
          <Modal
            open={isOpen}
            footer={null}
            title="Thông tin phương tiện"
            onCancel={() => setIsOpen(false)}
            width={670}
            closeIcon={<IoCloseOutline style={{ fontSize: "24px" }} />}
          >
            <ViewCar carData={carData} anotherData={anotherData} />
          </Modal>
          {found && (
            <Space style={{ marginBottom: "2rem" }} size="middle">
              <Button onClick={() => setIsOpen(true)}>Xem thông tin</Button>
              <Popconfirm
                title="Đăng kiểm phương tiện"
                description="Bạn có chắc chắn muốn đăng kiểm phương tiện này?"
                cancelText="Hủy"
                okText="Tiếp tục"
                cancelButtonProps={{ size: "middle" }}
                okButtonProps={{ size: "middle" }}
                onConfirm={() => {
                  next();
                  setFound(false);
                }}
              >
                <Button type="primary">Tiếp tục</Button>
              </Popconfirm>
            </Space>
          )}
          <Image src={image} preview={false} width={250} />
        </>
      )}
      {current === 1 && (
        <Card
          className={classes.form}
          title="Đăng kiểm phương tiện"
          extra={
            <Button
              onClick={() => {
                prev();
              }}
            >
              <TextWithIcon text="Trở lại" Icon={IoReturnUpBackOutline} />
            </Button>
          }
        >
          <Form
            name="create-form"
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
          >
            <Row gutter={[30, 16]} align="bottom">
              {inputItems.map((item) => {
                return (
                  <InputBox
                    type={item.type}
                    key={item.name}
                    label={item.label}
                    name={item.name}
                    addonAfter={item.addonAfter}
                    placeholder={item.placeholder}
                  />
                );
              })}

              <Col span={24}>
                <Space
                  style={{ width: "100%", justifyContent: "center" }}
                  size="large"
                >
                  <Button htmlType="reset">Đặt lại</Button>
                  <Button type="primary" htmlType="submit" loading={submitting}>
                    {submitting ? "Đang hoàn tất" : "Hoàn tất"}
                  </Button>
                </Space>
              </Col>
            </Row>
          </Form>
        </Card>
      )}
      {current === 2 && (
        <Result
          status="success"
          title="Đăng kiểm cho phương tiện thành công"
          extra={
            <Space size="middle">
              <Button size="large" onClick={() => setCurrent(0)}>
                Quay về
              </Button>
              <Button
                type="primary"
                size="large"
                onClick={() => {
                  navigate(`/inspections/${inspectionId}`);
                }}
              >
                Xem đăng kiểm
              </Button>
            </Space>
          }
        />
      )}
    </div>
  );
};

export default CreateInspection;
