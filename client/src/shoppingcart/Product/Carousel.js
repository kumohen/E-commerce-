import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image1 from "../../api/Capture.PNG";
import Image2 from "../../api/Capture5.PNG";
import Image3 from "../../api/Capture3.PNG";
import Image4 from "../../api/Capture4.PNG";

const CarouselItem = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div>
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={5000}
      >
        <div>
          <img src={Image1} style={{ width: "100%" }} alt="mohen" />
        </div>
        <div>
          {" "}
          <img src={Image2} style={{ width: "100%" }} alt="mohen" />
        </div>
        <div>
          {" "}
          <img src={Image3} style={{ width: "100%" }} alt="mohen" />
        </div>
        <div>
          <img src={Image4} style={{ width: "100%" }} alt="mohen" />
        </div>
      </Carousel>
      ;
    </div>
  );
};

export default CarouselItem;
