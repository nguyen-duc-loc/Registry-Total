import { Avatar, Card, ConfigProvider, Descriptions, Space } from "antd";
import { useAuthUser } from "react-auth-kit";
import avatar from "./../../../assets/images/avatar.png";
import classes from "./../../../styles/Content/Settings/Profile.module.css";

const processBirthDate = (birthDate) => {
  const [month, day, year] = new Date(birthDate)
    .toLocaleDateString()
    .split("/");
  return [day, month, year].join("/");
};

const Profile = () => {
  const auth = useAuthUser();
  const user = auth().data;

  return (
    <ConfigProvider
      theme={{
        token: {
          paddingLG: 22,
          colorBorderSecondary: "var(--color-grey-dark-1)",
        },
      }}
    >
      <h1 className={classes.title}>Hồ sơ của tôi</h1>
      <Space
        direction="vertical"
        size="large"
        style={{
          display: "flex",
          padding: "3rem",
        }}
      >
        <Card>
          <Space size="large">
            <Avatar src={avatar} size={100} />
            <Space direction="vertical" size="small">
              <span className={classes.name}>{user.name}</span>
              <span className={classes.role}>
                {user.role === "staff" ? "Nhân viên" : "Quản trị viên"}
              </span>
              <span className={classes.address}>
                {user.workFor.address}, Việt Nam
              </span>
            </Space>
          </Space>
        </Card>
        <Card title="Thông tin cá nhân">
          <Descriptions
            layout="vertical"
            labelStyle={{
              color: "var(--color-grey-dark-3)",
            }}
            contentStyle={{ paddingBottom: "16px", fontWeight: "500" }}
            colon={false}
            column={{
              sm: 2,
              xs: 1,
            }}
          >
            <Descriptions.Item label="Họ và tên">{user.name}</Descriptions.Item>
            <Descriptions.Item label="Ngày sinh">
              {processBirthDate(user.dateOfBirth)}
            </Descriptions.Item>
            <Descriptions.Item label="Số điện thoại">
              +84 {user.phone}
            </Descriptions.Item>
            <Descriptions.Item label="Số căn cước công dân">
              {user.ssn}
            </Descriptions.Item>
            <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
          </Descriptions>
        </Card>
        <Card title="Địa chỉ làm việc">
          <Descriptions
            layout="vertical"
            labelStyle={{
              color: "var(--color-grey-dark-3)",
            }}
            contentStyle={{ paddingBottom: "16px", fontWeight: "500" }}
            colon={false}
            column={{
              sm: 2,
              xs: 1,
            }}
          >
            <Descriptions.Item label="Quốc gia">Việt Nam</Descriptions.Item>
            <Descriptions.Item label="Tỉnh / Thành phố">
              {user.workFor.address}
            </Descriptions.Item>
            <Descriptions.Item label="Số điện thoại">
              +84 {user.workFor.phone}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {user.workFor.email}
            </Descriptions.Item>
            <Descriptions.Item label="Tên trung tâm">
              {user.workFor.name}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </Space>
    </ConfigProvider>
  );
};

export default Profile;
