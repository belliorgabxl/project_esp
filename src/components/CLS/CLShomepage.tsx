"use client"
import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function CLShomepage() {
  return (
    <div>
        <Carousel 
            autoPlay={true}
            interval={2500}
            width="full"
            infiniteLoop={true}
            showArrows={false}
            showThumbs={false}
            dynamicHeight={false}
            swipeable={false}
         >
                <div>
                    <img src="/assets/slide01.jpg" />
                    <p className="legend">Beyond to new technology</p>
                </div>
                <div>
                    <img src="/assets/slide02.jpg" />
                    <p className="legend">Our Service</p>
                </div>
                <div>
                    <img src="/assets/slide03.jpg"  />
                    <p className="legend">you never seen before</p>
                </div>
                <div>
                    <img src="/assets/slide04.jpg"  />
                    <p className="legend">5G planning</p>
                </div>
                <div>
                    <img src="/assets/slide05.jpg"  />
                    <p className="legend">Iot EveryWhere</p>
                </div>
            </Carousel>
    </div>
  )
}


