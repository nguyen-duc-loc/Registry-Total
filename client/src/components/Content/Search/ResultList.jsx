import { Avatar, Image, List, Skeleton } from "antd";
import { Link } from "react-router-dom";
import searchImage1 from "./../../../assets/images/search-1.svg";
import searchImage2 from "./../../../assets/images/search-3.svg";
import notFoundImage from "./../../../assets/images/void.svg";
import carImage from "./../../../assets/images/car.png";
import inspectionImage from "./../../../assets/images/checked.png";

const ResultList = (props) => {
  const searchCar = props.search === "car";

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
            actions={[
              <Link
                to={`/${searchCar ? "cars/search" : "inspections"}/${item.id}`}
              >
                Xem chi tiết
              </Link>,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  src={searchCar ? carImage : inspectionImage}
                  size={20}
                />
              }
              title={searchCar ? item.numberPlate : item.inspectionNumber}
              description={
                item.id !== "" &&
                `#${searchCar ? item.registrationNumber : item.centre.name}`
              }
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
        src={searchCar ? searchImage1 : searchImage2}
        width={250}
        style={{ margin: "4rem 0" }}
        preview={false}
      />
      <br />
      <span>
        Bắt đầu tìm kiếm {searchCar ? "phương tiện" : "đăng kiểm"} nào!
      </span>
    </>
  );
};

export default ResultList;
