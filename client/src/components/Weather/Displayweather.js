import React from "react";
import { connect } from "react-redux";

import { roundData, weatherImage } from "../../utils/other_weathers";
import GoogleMap from "./Google_map";

const TodayWeather = props => {
  if (!props.additionalTodayWeather) return <div />;

  const additionalWeather = props.additionalTodayWeather;
  const { lat, lng } = props.area;

  return (
    <div>
      <div className="mt-2 mb-2 bg-danger rounded">
        <h2 className="subTitle text-light card-header">
          Real-Time Weather Info
        </h2>
      </div>
      <div className="card-title">
        <div className="row text-center mt-3">
          <div className="col col-md mr-1 mb-2">
            <div id="weather-title" className="bg-success">
              Restaurant Location
            </div>
            <GoogleMap lat={lat} lng={lng} />
          </div>
          <div className="col col-md border border-info ml-1 mr-1 mb-2">
            <div id="weather-title" className="bg-info">
              {" "}
              Weather{" "}
            </div>
            <div id="weather" className="my-2">
              {weatherImage(additionalWeather.weather[0].main)}
            </div>
          </div>
          <div className="col col-md border border-primary ml-1 mr-1 mb-2">
            <div id="weather-title" className="bg-secondary">
              {" "}
              Highest{" "}
            </div>
            <div id="weather" className="my-4">
              {roundData(additionalWeather.main.temp_max - 273)} &#8451;
            </div>
          </div>
          <div className="col col-md border border-danger ml-1 mr-1 mb-2">
            <div id="weather-title" className="bg-danger">
              {" "}
              Present{" "}
            </div>
            <div id="weather" className="my-4">
              {roundData(additionalWeather.main.temp - 273)} &#8451;
            </div>
          </div>
          <div className="col col-md border border-warning ml-1 mr-1 mb-2">
            <div id="weather-title" className="bg-warning">
              {" "}
              Lowest{" "}
            </div>
            <div id="weather" className="my-4">
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
