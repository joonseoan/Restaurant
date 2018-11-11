import React from "react";
import { Carousel } from "react-bootstrap";

function Tradition(props) {
  return (
    <div
      className="card rounded mt-2"
      //   style={{
      //     // backgroundImage: "url(../images/korean_tradition.PNG)",
      //     //height: "300px"
      //     // imageResolution: "fluid"
      //   }}
    >
      <Carousel>
        <Carousel.Item>
          <img
            className="img img-fluid"
            style={{ width: "400px", height: "300px" }}
            alt="traditional_life1"
            src="./images/korean_tradition1.PNG"
          />
          <Carousel.Caption>
            <p>Korean Traditional Life (1)</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="img img-fluid"
            style={{ width: "400px", height: "300px" }}
            alt="tradition_life2"
            src="./images/korean_tradition2.PNG"
          />
          <Carousel.Caption>
            <p>Korean Traditional Life (2)</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="img img-fluid"
            style={{ width: "400px", height: "300px" }}
            alt="tradition_life3"
            src="./images/korean_tradition3.PNG"
          />
          <Carousel.Caption>
            <p>Korean Traditional Life (3)</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Tradition;
