"use client"
import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./styles.css";
type Props= {
    isLoading:boolean;
}
export default function CRSAboutUs({isLoading}:Props) {
  return (
    <div className={`transition-opacity duration-1000 ${isLoading? 'animate-fadeIn':'opacity-0'}`}>
        <Carousel 
            autoPlay={true}
            interval={2500}
            width={1510}
            infiniteLoop={true}
            showArrows={false}
            showThumbs={false}
            dynamicHeight={false}
            swipeable={false}
         >
            <div>
                <img src="aboutus/telecom.jpg" />
                <p className="legend">
                    Telecommunication Engineering
                </p>
            </div>
            <div>
                <img src="aboutus/kmitl.jpg" />
                <p className="legend">
                    king's mongkut institute of Ladkrabang
                </p>
            </div>
            <div>
                <img src="aboutus/coding.jpg" />
                <p className="legend">
                    Develop moment
                </p>
            </div>
            </Carousel>
    </div>
  )
}


