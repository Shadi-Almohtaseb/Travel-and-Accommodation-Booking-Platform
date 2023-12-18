import React from "react";
import { HotelImage } from "../../@types/hotel";
import { Image } from "@nextui-org/react";
import Carousel from "react-multi-carousel";
import Loading from "../../components/Loading";
import { motion } from "framer-motion";
import useAnimationInView from "../../hooks/useAnimationInView";

interface HotelImagesProps {
  hotelImages: HotelImage[] | null;
  loading: boolean;
}

const HotelImages = ({ hotelImages, loading }: HotelImagesProps) => {
  const { controls, ref } = useAnimationInView();

  return (
    <div>
      {loading && hotelImages && hotelImages?.length === 0 ? (
        <Loading />
      ) : (
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 120 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={controls}
          transition={{ duration: 1 }}
          ref={ref}
        >
          <div>
            <Carousel
              showDots={true}
              responsive={responsive}
              infinite={true}
              autoPlaySpeed={1000}
              keyBoardControl={true}
              transitionDuration={500}
              containerClass="carousel-container"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px flex justify-center pb-12"
            >
              {hotelImages && hotelImages?.length > 0 ? (
                hotelImages?.map((image: HotelImage) => (
                  <div key={image.id} className="flex items-center gap-10 px-2">
                    <Image
                      src={image.url}
                      alt="hotel image"
                      className="mb-5 max-h-[350px] w-full rounded-xl"
                    />
                  </div>
                ))
              ) : (
                <Loading />
              )}
            </Carousel>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1600 },
    items: 3,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1600, min: 1200 },
    items: 2,
    slidesToSlide: 1,
  },
  smallTablet: {
    breakpoint: { max: 1200, min: 780 },
    items: 1,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 780, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

export default HotelImages;
