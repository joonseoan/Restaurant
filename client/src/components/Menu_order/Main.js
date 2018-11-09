import React, { Component } from "react";

import CartInput from "./Cart_input";
import Orders from "./Orders";
import RecommendationMessage from "./Recommendation_message";
import Details from "./Details";

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

    const path = "./images/";

    return (
      <div>
        <label className="d-block clearfix mt-2">
          <span
            className="float-left d-block"
            style={{
              fontSize: "13px",
              color: !this.props.color ? "#424242" : this.props.color
            }}
          >
            <b style={{ fontSize: "16px" }}>{name}</b> ($
            {price}
            ):
          </span>
          <CartInput
            controlFunction={this.props}
            selectedMenu={this.props.selectedMenu}
          />
        </label>

        <RecommendationMessage menuNames={name} />

        <Details namePrice={{ name, price }} />

        <Orders
          cartAndButton={data}
          refreshAction={this.props.refreshAction}
          setRefresh={this.props.setRefresh}
          setCountIsZero={this.props.setCountIsZero}
        />

        <img
          className="img img-fluid img-thumbnail mt-3"
          src={path + file}
          alt={name}
          style={{ width: "150px", height: "100px" }}
        />

        <div className="mt-3 border-top">
          <p
            className="text-justify text-left text-muted mt-2 border-secondary"
            style={{ fontFamily: "ubuntu", fontSize: "14px" }}
          >
            {description}
          </p>
        </div>
      </div>
    );
  }
}

export default Main;
