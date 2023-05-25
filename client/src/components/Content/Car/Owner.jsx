import { Descriptions } from "antd";
import {
  IoCallOutline,
  IoPersonOutline,
  IoMailOutline,
  IoLocationOutline,
  IoIdCardOutline,
} from "react-icons/io5";
import TextWithIcon from "../../UI/TextWithIcon";

const { Item } = Descriptions;

const Owner = (props) => {
  const owner = props.owner;

  return (
    <Descriptions
      column={props.columnProps ? props.columnProps : 1}
      style={{ padding: "1.2rem" }}
      layout="vertical"
    >
      <Item label={<TextWithIcon Icon={IoPersonOutline} text="Họ và tên" />}>
        {owner.name}
      </Item>
      <Item label={<TextWithIcon Icon={IoLocationOutline} text="Địa chỉ" />}>
        {owner.address}
      </Item>
      <Item label={<TextWithIcon Icon={IoCallOutline} text="Số điện thoại" />}>
        {owner.phone}
      </Item>
      <Item label={<TextWithIcon Icon={IoMailOutline} text="Email" />}>
        {owner.email}
      </Item>
      <Item label={<TextWithIcon Icon={IoIdCardOutline} text="Chủ sở hữu" />}>
        Chủ sở hữu {owner.role === "organization" ? "doanh nghiệp" : "cá nhân"}
      </Item>
    </Descriptions>
  );
};

export default Owner;
