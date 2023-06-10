import {
  Avatar,
  ConfigProvider,
  Menu,
  Modal,
  Upload,
  message,
  Button,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import classes from "./../../styles/Layout/MenuItems.module.css";
import { useAuthUser, useSignOut } from "react-auth-kit";
import {
  IoAddCircle,
  IoAddCircleOutline,
  IoBarChart,
  IoBarChartOutline,
  IoCarOutline,
  IoFileTrayFullOutline,
  IoGrid,
  IoGridOutline,
  IoSearch,
  IoSearchOutline,
} from "react-icons/io5";
import avatar from "./../../assets/images/avatar.svg";
import { useState } from "react";

const styleIcon = {
  verticalAlign: "middle",
  marginLeft: "-2px",
  fontSize: "2rem",
};

const defaultStyleLink = {
  fontSize: "14px",
  fontWeight: "400",
  marginLeft: "0",
};

const styleLink = (isActive) => {
  return {
    ...defaultStyleLink,
    fontWeight: isActive ? "600" : "400",
  };
};

const getItem = (label, key, icon, children, type) => {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
};

const MenuItem = () => {
  const signOut = useSignOut();
  const auth = useAuthUser();
  const admin = auth().data.role === "admin";
  const [open, setOpen] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  const uploadHandler = async () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      console.log(file);
      formData.append("file", file);
    });

    setUploading(true);

    console.log(formData);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/cars/uploads`,
        {
          method: "POST",
          headers: {
            Authorization: authHeader(),
          },
          body: formData,
        }
      );

      if (!response.ok) {
        setUploading(false);
        message.error("Cannot upload file.");
        throw new Error("Cannot upload");
      }

      const res = await response.json();
      console.log(res);
      message.success("Upload file successfully.");
      setFileList([]);
      setUploading(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  const props = {
    accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    onChange(info) {
      console.log(info.file);
    },
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  const items = [
    getItem(
      <NavLink to="/" style={({ isActive }) => styleLink(isActive)}>
        Bảng điều khiển
      </NavLink>,
      "dashboard",
      <NavLink to="/" style={({ isActive }) => styleLink(isActive)}>
        {({ isActive }) =>
          isActive ? (
            <IoGrid style={styleIcon} />
          ) : (
            <IoGridOutline style={styleIcon} />
          )
        }
      </NavLink>
    ),
    !admin &&
      getItem(
        <span style={defaultStyleLink}>Quản lí đăng kiểm</span>,
        "registration",
        <IoFileTrayFullOutline style={styleIcon} />,
        [
          getItem(
            <NavLink
              to="/inspections/all"
              style={({ isActive }) => styleLink(isActive)}
            >
              Tất cả đăng kiểm
            </NavLink>,
            "all-inspections"
          ),
          getItem(
            <NavLink
              to="/inspections/me"
              style={({ isActive }) => styleLink(isActive)}
            >
              Đăng kiểm của tôi
            </NavLink>,
            "my-inspections"
          ),
        ]
      ),
    admin &&
      getItem(
        <span style={defaultStyleLink}>Quản lí các trung tâm</span>,
        "centre",
        <IoFileTrayFullOutline style={styleIcon} />,
        [
          getItem(
            <NavLink
              to="/centres/all"
              style={({ isActive }) => styleLink(isActive)}
            >
              Tất cả trung tâm
            </NavLink>,
            "all-centres"
          ),
          getItem(
            <NavLink
              to="/centres/create"
              style={({ isActive }) => styleLink(isActive)}
            >
              Tạo trung tâm
            </NavLink>,
            "my-inspections"
          ),
        ]
      ),
    !admin &&
      getItem(
        <NavLink
          to="/inspections/create"
          style={({ isActive }) => styleLink(isActive)}
        >
          Tạo đăng kiểm
        </NavLink>,
        "create-registration",
        <NavLink to="/create" style={({ isActive }) => styleLink(isActive)}>
          {({ isActive }) =>
            isActive ? (
              <IoAddCircle style={styleIcon} />
            ) : (
              <IoAddCircleOutline style={styleIcon} />
            )
          }
        </NavLink>
      ),
    !admin &&
      getItem(
        <NavLink
          to="/cars/search"
          style={({ isActive }) => styleLink(isActive)}
        >
          Tra cứu phương tiện
        </NavLink>,
        "search",
        <NavLink
          to="/cars/search"
          style={({ isActive }) => styleLink(isActive)}
        >
          {({ isActive }) =>
            isActive ? (
              <IoSearch style={styleIcon} />
            ) : (
              <IoSearchOutline style={styleIcon} />
            )
          }
        </NavLink>
      ),
    admin &&
      getItem(
        <span style={{ ...defaultStyleLink }}>Quản lí phương tiện</span>,
        "vehicle",
        <IoCarOutline style={styleIcon} />,
        [
          getItem(
            <NavLink
              to="/cars/search"
              style={({ isActive }) => styleLink(isActive)}
            >
              Tra cứu phương tiện
            </NavLink>,
            "search"
          ),
          getItem(
            <span style={defaultStyleLink}>Tải lên dữ liệu</span>,
            "upload"
          ),
        ]
      ),
    getItem(
      <NavLink to="/statistics" style={({ isActive }) => styleLink(isActive)}>
        Thống kê
      </NavLink>,
      "statistics",
      <NavLink to="/statistics" style={({ isActive }) => styleLink(isActive)}>
        {({ isActive }) =>
          isActive ? (
            <IoBarChart style={styleIcon} />
          ) : (
            <IoBarChartOutline style={styleIcon} />
          )
        }
      </NavLink>
    ),
    getItem(
      <span style={{ ...defaultStyleLink, transform: "translateX(-8px)" }}>
        Tài khoản
      </span>,
      "account",
      <Avatar
        src={avatar}
        size="small"
        style={{ transform: "translateX(-6px)" }}
      />,
      [
        getItem(
          <NavLink to="/settings" style={({ isActive }) => styleLink(isActive)}>
            Cài đặt
          </NavLink>,
          "settings"
        ),
        getItem(<span style={defaultStyleLink}>Đăng xuất</span>, "logout"),
      ]
    ),
  ];

  return (
    <>
      <Modal
        title="Tải lên dữ liệu xe đã đăng kí"
        open={open}
        onOk={() => {
          setOpen(false);
        }}
        onCancel={() => {
          setOpen(false);
        }}
        okText="Bắt đầu tải lên"
        cancelText="Hủy"
        footer={[]}
      >
        <div
          style={{
            marginTop: "3.2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <Upload.Dragger {...props} style={{ width: "250px" }}>
            <p className="ant-upload-drag-icon">
              <UploadOutlined style={{ fontSize: "36px" }} />
            </p>
            <p className="ant-upload-text">Upload user</p>
            <p className="ant-upload-hint">upload .xlsx file</p>
          </Upload.Dragger>
          <Button
            type="primary"
            onClick={uploadHandler}
            disabled={fileList.length === 0}
            loading={uploading}
          >
            {uploading ? "Đang tải lên" : "Bắt đầu tải lên"}
          </Button>
        </div>
      </Modal>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#27272a",
            colorBgTextHover: "var(--color-grey-dark-1)",
            controlItemBgActive: "none",
            borderRadius: "1.2rem",
            controlHeightLG: 48,
            colorFillQuaternary: "transparent",
            padding: 22,
          },
        }}
      >
        <Menu
          mode="inline"
          items={items}
          className={classes.menu}
          style={{ border: "none" }}
          onClick={(e) => {
            if (e.key === "logout") {
              signOut();
            } else if (e.key === "upload") {
              setOpen(true);
            }
          }}
        />
      </ConfigProvider>
    </>
  );
};

export default MenuItem;
