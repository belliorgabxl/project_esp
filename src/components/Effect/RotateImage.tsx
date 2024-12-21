

import React from "react";
import "./styles.css";

export default function RotateImage() {
  return (
    <div className="">
    <div className="banner">
      <div
        className="slider"
        style={{ "--quatity": 10 } as React.CSSProperties}
      >
        <div className="item" style={{ "--position": 1 } as React.CSSProperties}>
          <img
            src="/assets/product_arm.jpeg"

            alt="test1"
          />
        </div>

        <div className="item" style={{ "--position": 2 } as React.CSSProperties}>
          <img
            src="/assets/product_car.jpeg"

            alt="test2"
          />
        </div>

        <div className="item" style={{ "--position": 3 } as React.CSSProperties}>
          <img
            src="/assets/product_pump.jpg"

            alt="test3"
          />
        </div>

        <div className="item" style={{ "--position": 4 } as React.CSSProperties}>
          <img
            src="/assets/product_arm.jpeg"
            alt="test4"
          />
        </div>
        <div className="item" style={{ "--position": 5 } as React.CSSProperties}>
          <img
            src="/assets/product_car.jpeg"
            alt="test5"
          />
        </div>
        <div className="item" style={{ "--position": 6 } as React.CSSProperties}>
          <img
            src="/assets/product_pump.jpg"
            alt="test6"
          />
        </div>
        <div className="item" style={{ "--position": 7 } as React.CSSProperties}>
          <img
            src="/assets/product_arm.jpeg"
            alt="test7"
          />
        </div>
        <div className="item" style={{ "--position": 8 } as React.CSSProperties}>
          <img
            src="/assets/product_car.jpeg"
            alt="test8"
          />
        </div>

        <div className="item" style={{ "--position": 9 } as React.CSSProperties}>
          <img
            src="/assets/product_pump.jpg"
            alt="test9"
          />
        </div>
        <div className="item" style={{ "--position": 10 } as React.CSSProperties}>
          <img
            src="/assets/product_arm.jpeg"
            alt="test10"
          />
        </div>
      </div>
    </div>
    </div>
  );
}
