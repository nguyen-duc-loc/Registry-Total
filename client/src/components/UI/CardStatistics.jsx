import { Card, Statistic, Image } from "antd";
import CountUp from "react-countup";

const formatter = (value) => <CountUp end={value} separator="," />;

const CardStatistics = (props) => {
  return (
    <Card loading={props.loading}>
      <Statistic
        title={props.title}
        value={props.value}
        formatter={formatter}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "1.6rem",
        }}
      >
        <Image
          src={props.src}
          height={props.height}
          preview={false}
          style={{ paddingTop: "1.6rem" }}
        />
      </div>
    </Card>
  );
};

export default CardStatistics;
