import React from "react";
import { connect } from "react-redux";

import { roundData, weatherImage } from "../../utils/other_weathers";
import GoogleMap from "./Google_map";

const TodayWeather = props => {
  if (!props.additionalTodayWeather) return <div />;

  const additionalWeather = props.additionalTodayWeather;
  const { lat, lng } = props.area;

  return (
    <div className="container">
      <div className="mt-5 mb-3">
        <h4 className="text-center">Real-Time Weather Info</h4>
      </div>
      <div>
        <div className="row text-center mt-3">
          <div
            className="col col-md mr-1 mb-2 wow flipInY"
            data-wow-delay="0.5s"
          >
            <div className="bg-success">Restaurant Location</div>
            <GoogleMap lat={lat} lng={lng} />
          </div>
          <div
            className="col col-md border border-info ml-1 mr-1 mb-2 wow flipInY"
            data-wow-offset="50"
            data-wow-delay="1.3s"
          >
            <div className="bg-info"> Weather </div>
            <div className="my-2">
              {weatherImage(additionalWeather.weather[0].main)}
            </div>
          </div>
          <div
            className="col col-md border border-primary ml-1 mr-1 mb-2 wow flipInY"
            data-wow-offset="50"
            data-wow-delay="0.7s"
          >
            <div className="bg-secondary"> Highest </div>
            <div className="my-4">
              {roundData(additionalWeather.main.temp_max - 273)} &#8451;
            </div>
          </div>
          <div
            className="col col-md border border-danger ml-1 mr-1 mb-2 wow flipInY"
            data-wow-offset="50"
            data-wow-delay="0.9s"
          >
            <div className="bg-danger"> Present </div>
            <div className="my-4">
              {roundData(additionalWeather.main.temp - 273)} &#8451;
            </div>
          </div>
          <div
            className="col col-md border border-warning ml-1 mr-1 mb-2 wow flipInY"
            data-wow-offset="50"
            data-wow-delay="1.1s"
          >
            <div className="bg-warning"> Lowest </div>
            <div className="my-4">
              {roundData(additionalWeather.main.temp_min - 273)} &#8451;
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps({ additionalTodayWeather }) {
  return { additionalTodayWeather };
}

export default connect(mapStateToProps)(TodayWeather);
