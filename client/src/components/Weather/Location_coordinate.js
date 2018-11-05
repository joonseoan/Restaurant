import React from "react";
import { connect } from "react-redux";

import Displayweather from "./Displayweather";
import DateTimeDisplay from "./Date_time_display";

const LocationCoordinate = props => {
  if (!props.branchLocation) return <div />;

  const { geometry, address_components } = props.branchLocation.results[0];
  return (
    <div>
      <div>
        <Displayweather area={geometry.location} />
      </div>
      <div>
        <DateTimeDisplay city={address_components[0].long_name} />
      </div>
    </div>
  );
};

function mapsPropsToState({ branchLocation }) {
  return { branchLocation };
}

export default connect(mapsPropsToState)(LocationCoordinate);
