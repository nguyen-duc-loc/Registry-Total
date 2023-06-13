import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import {useEffect} from 'react';

const PageNotExist = () => {
  const navigate = useNavigate();

  useEffect(()=> {
      document.title = "404 - Trang web này không tồn tại"
  },[])

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
