import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="403"
      title="403"
      subTitle="Xin lỗi, bạn không có quyền truy cập trang web này."
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          Trở về trang chủ
        </Button>
      }
    />
  );
};

export default Unauthorized;
