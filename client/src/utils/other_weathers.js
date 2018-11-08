import React from "react";
import { regexFilter } from "./mainWeather";
import _ from "lodash";

export function roundData(weather) {
  return _.round(weather);
}

export function weatherImage(mainWeather) {
  const image = regexFilter(mainWeather);

  const src = `../images/${image}.PNG`;

  return (
    <img
      className="img img-fluid mt-2"
      src={src}
      alt={image}
      style={{ height: "80px" }}
    />
  );
}
