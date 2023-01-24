import React, { useEffect, useState } from "react";
import {
  MdChevronLeft,
  MdChevronRight,
  MdOutlineLocalOffer,
} from "react-icons/md";
import { IoFastFoodOutline } from "react-icons/io5";
import { IoIosRestaurant } from "react-icons/io";
import { GoLocation } from "react-icons/go";
import { BiBarcodeReader } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Carousel = () => {
  const [slide, setSlide] = useState(0);

  const [banners, setBanners] = useState([]);
  const length = banners.length;
  const navigate = useNavigate()

  const prevSlide = () => {
    setSlide(slide === length - 1 ? 0 : slide + 1);
  };

  const nextSlide = () => {
    setSlide(slide === 0 ? length - 1 : slide - 1);
  };

  const autoScroll = true;
  let slideInterval;
  let intervalTime = 10000;

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
        if(data.err) {
          
          return navigate('/PageNotFound')
        }
        setBanners(data.banners);
      })
      .catch((err) => {
        navigate('/PageNotFound')
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
              <>
                <div className="absolute bg-[#a8a29e] rounded-xl bg-opacity-70 ml-28  mt-28 py-6 sm:w-[20rem] md:w-[30rem] justify-center">
                  <div className="justify-start mx-auto w-[75%]">
                    <p className="sm:text-[1rem] md:text-[2.5rem] uppercase text-white font-bold flex ">
                      <IoFastFoodOutline className="md:mt-2 mx-2 text-[#7f1d1d]" />
                      {banner.foodName}
                    </p>
                    <p className="sm:text-[0.8rem] md:text-[2rem] text-white font-semibold flex ">
                      <IoIosRestaurant className="md:mt-2 text-[#7f1d1d] mx-2" />
                      {banner.resName}
                    </p>
                    <p className="sm:text-[1rem] md:text-[2.5rem] uppercase text-white font-bold flex ">
                      <MdOutlineLocalOffer className="md:mt-3 mx-2 text-[#7f1d1d] md:w-8 md:h-8" />
                      {banner.offer} OFF
                    </p>
                    {banner.code && (
                      <p className="sm:text-[0.8rem] md:text-[1.8rem] text-white font-semibold flex ">
                        <BiBarcodeReader className="md:mt-2 mx-2 text-[#7f1d1d]" />
                        {banner.code}
                        <p className="border text-[#7f1d1d] text-sm h-5 mt-4 ml-2 rounded-xl ">
                          Use this code
                        </p>
                      </p>
                    )}
                    <p className="sm:text-[0.8rem] md:text-[2rem] text-white font-semibold uppercase flex ">
                      <GoLocation className="md:mt-3 text-[#7f1d1d] mx-2 md:w-6 md:h-6" />
                      {banner.address}
                    </p>
                  </div>
                </div>
                <img
                  className=" w-full h-[500px] rounded-lg"
                  src={banner.images[0].url}
                  alt="/"
                />
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Carousel;
