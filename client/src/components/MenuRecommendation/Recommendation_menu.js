import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import SetCurrentRecommendation from "./Set_current_recommendation";
import ModalGuestbookAllPosted from "../Show_guestbook/Modal_ guestbook_all_posted";
import { roundData } from "../../utils/other_weathers";
import { orderState, fetchGuesbookLists } from "../../actions";

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

  // handleButton = () => {
  //   console.log(this.props);
  //   const direction =

  //   //className="text-center" show={props.thankyou}
  // };

  componentDidMount() {
    this.props.fetchGuesbookLists();
  }

  render() {
    const { menu, additionalTodayWeather } = this.props;

    if (!menu || !additionalTodayWeather) return <div />;

    const { main, description } = additionalTodayWeather.weather[0];
    const { temp } = additionalTodayWeather.main;

    return (
      <div className="container card mt-5 recommendation-background">
        <h2 className="card-header subTitle text-white bg-danger rounded">
          Present Special Menu
        </h2>
        <div className="slide-left neon-background border-top mt-5 mb-1 mx-auto card-title w-75">
          <p className="text-danger">
            Hi customers. It is{" "}
            <strong className="blink text-success">{description}</strong>. In
            this weather, you might enjoy the followings.
          </p>
        </div>
        <div className="text-center">
          <SetCurrentRecommendation
            inputMenus={menu}
            mainWeather={main}
            temperature={roundData(temp - 273)}
            menuOrdered={this.props.menuOrdered}
          />
        </div>
        <div
          className="container text-center mb-4"
          style={{ fontFamily: "ubuntu" }}
        >
          <ModalGuestbookAllPosted guestbooks={this.props.guestbooks} />
        </div>
      </div>
    );
  }
}

function mapsPropsToState({ menu, additionalTodayWeather, guestbooks }) {
  return { menu, additionalTodayWeather, guestbooks };
}

export default connect(
  mapsPropsToState,
  { orderState, fetchGuesbookLists }
)(RecommendationMenu);
