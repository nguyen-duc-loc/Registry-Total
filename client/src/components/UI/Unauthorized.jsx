import {Button, Result} from "antd";
import {useNavigate} from "react-router-dom";
import {useEffect} from 'react';

const Unauthorized = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "403 - Bạn không có quyền truy cập trang web này"
    }, [])

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
