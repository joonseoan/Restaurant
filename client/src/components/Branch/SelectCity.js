import React from "react";
import { options } from "../../utils/cities";

const SelectCity = props => {
  const handleOnClick = e => {
    const { setCity, refreshStatus } = props;

    refreshStatus();
    const { value } = e.target;
    sessionStorage.setItem("branch_city", value);
    setCity(value);
  };

  return (
    <div className="w-50">
      <div className="dropdown">
        <button
          className="btn btn-success dropdown-toggle"
          type="button"
          data-toggle="dropdown"
        >
          BRANCH RESTAURANTS
        </button>

        <div className="dropdown-menu border border-danger">
          {options.map(cities => (
            <button
              key={cities.value}
              className="btn dropdown-item text-left"
              onClick={handleOnClick}
              value={cities.value}
            >
              {cities.value}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectCity;
