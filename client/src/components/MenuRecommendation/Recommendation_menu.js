import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import SetCurrentRecommendation from "./Set_current_recommendation";
import { roundData } from "../../utils/other_weathers";

class RecommendationMenu extends Component {
  // shouldComponentUpdate(nextProps, nextState) {
  //   const { menu, additionalTodayWeather } = this.props;

  //   if (!menu || !additionalTodayWeather) return false;

  //   const {
  //     main: { temp, temp_max, temp_min }
  //   } = this.props.additionalTodayWeather;

  //   const { main, description } = this.props.additionalTodayWeather.weather[0];

  //   if (
  //     temp === nextProps.additionalTodayWeather.temp &&
  //     temp_max === nextProps.additionalTodayWeather.temp_max &&
  //     temp_min === nextProps.additionalTodayWeather.temp_min &&
  //     main === nextProps.additionalTodayWeather.main &&
  //     description === nextProps.additionalTodayWeather.description
  //   )
  //     return false;

  //   return true;
  // }

  render() {
    const { menu, additionalTodayWeather } = this.props;

    if (!menu || !additionalTodayWeather) return <div />;

    const { main, description } = additionalTodayWeather.weather[0];
    const { temp } = additionalTodayWeather.main;

    return (
      <div className="container mt-5">
        <h2 className="border border-danger">PRESENT SPECIAL MENU</h2>
        <div className="slide-left border border-danger">
          <p style={{ fontSize: "24px" }}>
            Hi Customers. It is{" "}
            <strong className="blink text-primary">{description}</strong>. At
            this weather. we strongly recommend the following foods for you.
          </p>
        </div>
        <div className="border border-info text-center">
          <SetCurrentRecommendation
            inputMenus={menu}
            mainWeather={main}
            temperature={roundData(temp - 273)}
            menuOrdered={this.props.menuOrdered}
          />
        </div>

        <div className="container border border-danger text-center">
          <Link className="btn btn-info btn-sm mt-3" to="/guestbookAllPosted">
            REVIEW CUSTOMER's BEST CHOICE
          </Link>
        </div>
      </div>
    );
  }
}

function mapsPropsToState({ menu, additionalTodayWeather }) {
  return { menu, additionalTodayWeather };
}

export default connect(mapsPropsToState)(RecommendationMenu);
