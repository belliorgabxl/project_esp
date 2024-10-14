"use client"
import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function CRSProducts() {
  return (
    <div className='rounded-lg'>
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
                    <img src="assets/slideProduct01.jpg"  />
                    <p className="legend">Develop moment</p>
                </div>
                <div>
                    <img src="assets/slideProduct02.jpg"  />
                    <p className="legend">Develop moment</p>
                </div>
            </Carousel>
    </div>
  )
}


