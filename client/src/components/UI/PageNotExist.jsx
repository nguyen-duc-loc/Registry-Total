import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const PageNotExist = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle="Xin lỗi, trang web này không tồn tại."
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          Trở về trang chủ
        </Button>
      }
    />
  );
};

export default PageNotExist;
