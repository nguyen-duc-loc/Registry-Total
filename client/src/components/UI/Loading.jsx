import { Spin } from "antd";

const Loading = () => {
  return (
    <div
      style={{
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spin tip="Đang tải" size="large" />
    </div>
  );
};

export default Loading;
