import { Carousel, ConfigProvider, Image } from "antd";
import classes from "./../../styles/Login/IntroCarousel.module.css";

import carouselImg1 from "./../../assets/images/carousel-1.svg";
import carouselImg2 from "./../../assets/images/carousel-2.svg";
import carouselImg3 from "./../../assets/images/carousel-3.svg";
import carouselImg4 from "./../../assets/images/carousel-4.svg";

const IntroCarousel = () => {
  return (
    <div className={classes.intro}>
      <h1 className={classes.title}>Registry</h1>
      <ConfigProvider
        theme={{ token: { colorBgContainer: "var(--color-black)" } }}
      >
        <Carousel autoplay>
          <div>
            <Image src={carouselImg1} preview={false} className={classes.img} />
            <h2 className={classes.subtitle}>
              Đảm bảo phương tiện di chuyển an toàn hơn
            </h2>
          </div>
          <div>
            <Image src={carouselImg2} preview={false} className={classes.img} />
            <h2 className={classes.subtitle}>
              Giải quyết đăng kiểm nhanh chóng và uy tín
            </h2>
          </div>
          <div>
            <Image src={carouselImg3} preview={false} className={classes.img} />
            <h2 className={classes.subtitle}>
              Thống kê trở nên dễ dàng hơn bao giờ hết
            </h2>
          </div>
          <div>
            <Image src={carouselImg4} preview={false} className={classes.img} />
            <h2 className={classes.subtitle}>
              Theo dõi thông tin đăng kiểm trên toàn quốc
            </h2>
          </div>
        </Carousel>
      </ConfigProvider>
    </div>
  );
};

export default IntroCarousel;
