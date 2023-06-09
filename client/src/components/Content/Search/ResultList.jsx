import { Avatar, Image, List, Skeleton, Spin } from "antd";
import { Link } from "react-router-dom";
import searchImage from "./../../../assets/images/search-1.svg";
import notFoundImage from "./../../../assets/images/void.svg";
import carImage from "./../../../assets/images/car.png";

const ResultList = (props) => {
  return props.searchText.trim().length !== 0 ? (
    props.listData.length > 0 ? (
      <List
        itemLayout="horizontal"
        bordered
        dataSource={props.listData}
        pagination={{ align: "center", showSizeChanger: false }}
        style={{
          width: "100%",
          margin: "3rem auto",
          backgroundColor: "var(--color-white)",
        }}
        renderItem={(item) => (
          <List.Item
            actions={[<Link to={`/search/${item.id}`}>Xem chi tiết</Link>]}
          >
            <List.Item.Meta
              avatar={<Avatar src={carImage} />}
              title={item.numberPlate}
              description={item.id !== "" && `#${item.registrationNumber}`}
              style={{ textAlign: "left" }}
            />
          </List.Item>
        )}
        loading={props.loading}
      />
    ) : (
      <Skeleton
        active
        title={false}
        paragraph={{ rows: 10, width: "100%" }}
        loading={props.loading}
        style={{ margin: "4rem 0" }}
      >
        <Image
          src={notFoundImage}
          width={250}
          preview={false}
          style={{ margin: "4rem 0" }}
        />
        <br />
        <span>Không có kết quả cho "{props.searchText}" !!!</span>
      </Skeleton>
    )
  ) : (
    <>
      <br />
      <Image
        src={searchImage}
        width={250}
        style={{ margin: "4rem 0" }}
        preview={false}
      />
      <br />
      <span>Bắt đầu tìm kiếm phương tiện của bạn nào!</span>
    </>
  );
};

export default ResultList;
