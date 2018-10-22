import React, { Component } from "react";

import CartInput from "./Cart_input";
import Orders from "./Orders";
import RecommendationMessage from "./Recommendation_message";
import Details from "./Details";
// import RecommendationDescriptions from "../Current_recommendations/Recommendation_descriptions";

class Main extends Component {
  render() {
    if (!this.props) return <div />;

    const {
      menuItems: { name, price, description, file }
    } = this.props.menuColorControl;

    const data = {
      name,
      items: this.props.dataControl
    };

    const style = {
      width: "200px",
      height: "150px"
    };

    const path = "./images/";
    return (
      <div>
        <label className="d-block clearfix mt-2">
          <span
            className="float-left text-muted d-block"
            style={{ fontSize: "13px" }}
          >
            <b>{name}</b>
            ($
            {price}
            ):
          </span>

          <CartInput
            controlFunction={this.props}
            clickedMenuControl={this.props.clickedMenuControl}
            selectedMenu={this.props.selectedMenu}
          />
        </label>

        <RecommendationMessage menuNames={name} />

        <Details namePrice={{ name, price }} />

        <Orders
          cartAndButton={data}
          refreshAction={this.props.refreshAction}
          setRefresh={this.props.setRefresh}
        />

        <img
          style={style}
          className="img img-fluid img-thumbnail mt-3"
          src={path + file}
          alt={name}
        />

        <div className="mt-3">
          <p className="text-justify text-center">{description}</p>
        </div>
      </div>
    );
  }
}

export default Main;
