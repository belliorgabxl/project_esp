"use client";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

type Props = {
  isLoading: boolean;
};

export default function CRSProducts({ isLoading }: Props) {
  return (
    <div
      className={` duration-1000 ${isLoading ? "opacity-100" : "opacity-0"}`}
    >
      <Carousel
        autoPlay={true}
        interval={2500}
        width={400}
        infiniteLoop={true}
        showArrows={true}
        showThumbs={true}
        dynamicHeight={false}
        swipeable={false}
      >
        <div>
          <img src="assets/slideProduct01.jpg" />
          <p className="legend">Develop moment</p>
        </div>
        <div>
          <img src="assets/slideProduct02.jpg" />
          <p className="legend">Develop moment</p>
        </div>
        <div>
          <img src="assets/slideProduct03.jpg" />
          <p className="legend">Develop moment</p>
        </div>
        <div>
          <img src="assets/slideProduct04.jpg" />
          <p className="legend">Develop moment</p>
        </div>
      </Carousel>
    </div>
  );
}
