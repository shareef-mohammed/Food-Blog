import React, { useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const Carousel = () => {
  const [slide, setSlide] = useState(0);

  const [banners, setBanners] = useState([]);
  const length = banners.length;

  const prevSlide = () => {
    setSlide(slide === length - 1 ? 0 : slide + 1);
  };

  const nextSlide = () => {
    setSlide(slide === 0 ? length - 1 : slide - 1);
  };

  const autoScroll = true;
  let slideInterval;
  let intervalTime = 5000;

  function auto() {
    slideInterval = setInterval(nextSlide, intervalTime);
  }

  useEffect(() => {
    if (autoScroll) {
      auto();
    }
    return () => clearInterval(slideInterval);
  }, [slide, banners]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASEURL}/admin/getBanners`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setBanners(data.banners);
      })
      .catch(err => {
        console.log(err)
      });
  }, []);

  return (
    <div className="max-w-[1280px] mx-auto px-4 pt-3  relative flex justify-center items-center ">
      <MdChevronRight
        onClick={nextSlide}
        size={80}
        className="absolute top-[45%] text-3xl text-white cursor-pointer right-8"
      />
      <MdChevronLeft
        onClick={prevSlide}
        size={80}
        className="absolute top-[45%] text-3xl text-white cursor-pointer left-8"
      />
      {banners.map((banner, index) => {
        return (
          <div
            className={
              index === slide
                ? " opacity-100 w-full transition duration-1000 "
                : "opacity-0 transition duration-1000"
            }
            key={index}
          >
            {index === slide && (
              <img
                className=" w-full h-[500px] rounded-lg"
                src={banner.images[0].url}
                alt="/"
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Carousel;
