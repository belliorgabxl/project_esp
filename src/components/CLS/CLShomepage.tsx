"use client"
import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./styles.css";

export default function CLShomepage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className={`transition-opacity duration-1000${isLoaded ? 'animate-fadeIn' : 'opacity-0'}`}>
      <Carousel 
        autoPlay={true}
        interval={2600}
        width="full"
        
        autoFocus={false}
        infiniteLoop={true}
        showArrows={false}
        showThumbs={false}
        dynamicHeight={false}
        swipeable={true}
        stopOnHover={false}
      >
        <div>
          <img src="./assets/slide01.jpg" alt="slide1" />
          <p className="legend">Beyond to new technology</p>
        </div>
        <div>
          <img src="./assets/slide02.jpg" alt="slide2" />
          <p className="legend">Our Service</p>
        </div>
        <div>
          <img src="./assets/slide03.jpg" alt="slide3" />
          <p className="legend">You never seen before</p>
        </div>
        <div>
          <img src="./assets/slide04.jpg" alt="slide4" />
          <p className="legend">5G planning</p>
        </div>
        <div>
          <img src="./assets/slide05.jpg" alt="slide5" />
          <p className="legend">IoT Everywhere</p>
        </div>
      </Carousel>
    </div>
  );
}
