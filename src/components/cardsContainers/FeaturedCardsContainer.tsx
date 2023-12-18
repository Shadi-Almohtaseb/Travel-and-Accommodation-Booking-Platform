import React from "react";
import "react-multi-carousel/lib/styles.css";
import { Hotel } from "../../@types/hotel";
import Loading from "../../components/Loading";
import Carousel from "react-multi-carousel";
import FeaturedCard from ".././homeCards/FeaturedCard";
import { Link } from "react-router-dom";

interface featuredCardsContainerProps {
  featuredHotels: Hotel[];
  loading: boolean;
}

const FeaturedCardsContainer = ({
  featuredHotels,
  loading,
}: featuredCardsContainerProps) => {
  return (
    <div className="lg:mx-10 mx-3 mt-14">
      <span className="text-3xl">Featured Deals</span>
      {loading ? (
        <Loading />
      ) : (
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
            className="z-0"
          >
            {featuredHotels && featuredHotels.length > 0 ? (
              featuredHotels.map((hotel: Hotel) => (
                <Link to={`/hotel/${Date.now()}`} key={hotel.title}>
                  <FeaturedCard hotel={hotel} />
                </Link>
              ))
            ) : (
              <p>No featured hotels available.</p>
            )}
          </Carousel>
        </div>
      )}
    </div>
  );
};

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1600 },
    items: 4,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1600, min: 1200 },
    items: 3,
    slidesToSlide: 1,
  },
  smallTablet: {
    breakpoint: { max: 1200, min: 780 },
    items: 2,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 780, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

export default FeaturedCardsContainer;
