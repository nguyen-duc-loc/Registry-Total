import { Avatar, Image, List } from "antd";
import { Link } from "react-router-dom";
import searchImage from "./../../../assets/images/search.svg";
import notFoundImage from "./../../../assets/images/void.svg";

const ResultList = (props) => {
  return props.searchText.trim().length !== 0 ? (
    props.listData.length !== 0 ? (
      <List
        itemLayout="horizontal"
        bordered
        dataSource={props.listData}
        pagination={{ align: "center", showSizeChanger: false }}
        style={{
          width: "50rem",
          margin: "3rem auto",
          backgroundColor: "var(--color-white)",
        }}
        renderItem={(item, index) => (
          <List.Item
            actions={[<Link to={`/search/${item.id}`}>Xem chi tiết</Link>]}
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                />
              }
              title={item.numberPlate}
              description={`#${item.modelCode}`}
              style={{ textAlign: "left" }}
            />
          </List.Item>
        )}
      />
    ) : (
      <>
        <br />
        <Image
          src={notFoundImage}
          width={250}
          style={{ margin: "4rem 0" }}
          preview={false}
        />
        <br />
        <span>Không có kết quả cho "{props.searchText}" !!!</span>
      </>
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