import { Descriptions } from "antd";

const { Item } = Descriptions;

const Specification = (props) => {
  const specification = props.specification;

  return (
    <Descriptions
      column={props.columnProps ? props.columnProps : 1}
      style={{ padding: "1.2rem" }}
      layout="vertical"
    >
      <Item label="Công thức bánh xe">{specification.wheelFormula}</Item>
      <Item label="Vết bánh xe">{specification.wheelTread}</Item>
      <Item label="Kích thước bao">{specification.overallDimension}</Item>
      <Item label="Kích thước lòng thùng hàng">
        {specification.containerDimension}
      </Item>
      <Item label="Chiều dài cơ sở">{specification.lengthBase}</Item>
      <Item label="Khối lượng bản thân">{specification.kerbMass}</Item>
      <Item label="Khối lượng hàng CC theo TK/CP TGGT">
        {specification.designedAndAuthorizedPayload}
      </Item>
      <Item label="Khối lượng toàn bộ theo TK/CP TGGT">
        {specification.designedAndAuthorizedTotalMass}
      </Item>
      <Item label="Khối lượng kéo theo TK/CP TGGT">
        {specification.designedAndAuthorizedTowedMass}
      </Item>
      <Item label="Số người cho phép chở">
        {specification.permissibleCarry}
      </Item>
      <Item label="Loại nhiên liệu">{specification.fuel}</Item>
      <Item label="Thể tích làm việc của động cơ">
        {specification.engineDisplacement}
      </Item>
      <Item label="Công suất lớn nhất trên tốc độ quay">
        {specification.maximumOutputToRpmRatio}
      </Item>
      <Item label="Số lượng lốp, cỡ lốp">
        {specification.numberOfTiresAndTireSize.replace("tires", "lốp")}
      </Item>
    </Descriptions>
  );
};

export default Specification;
