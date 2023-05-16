import { Link } from "react-router-dom";
import { Image } from "antd";
import logo from "./../../assets/images/logo.png";
import { useMediaQuery } from "react-responsive";
import classes from "./../../styles/Layout/Logo.module.css";

const Logo = () => {
  const isTablet = useMediaQuery({ maxWidth: 992, minWidth: 768 });

  return (
    <Link to="/" className={classes.logo}>
      <Image src={logo} preview={false} width={32} />
      {!isTablet && <h1 className={classes.title}>Registry VN</h1>}
    </Link>
  );
};

export default Logo;
