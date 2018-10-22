import WOW from "wow.js";

import React, { Component } from "react";
import BranchList from "./Branch/Branch_list";
import LocationCoordinate from "./Weather/Location_coordinate";
import RecommendationMenu from "./MenuRecommendation/Recommendation_menu";
import MenuAndOrder from "./Menu_order/Menu_and_order";

class App extends Component {
  state = {
    newZero: null,
    new_name_price: [],
    new_order_button: null
  };

  componentDidMount = () => {
    sessionStorage.clear();

    if (typeof window !== "undefined") {
      const wow = new WOW();
      wow.init();
    }
  };

  render() {
    console.log(this.state.new_name_price, "at App");

    return (
      <div>
        <div className="mt-5">
          <BranchList
            refreshStatus={() => {
              this.setState({
                newZero: 0,
                new_name_price: [],
                new_order_button: "none"
              });
            }}
          />
        </div>

        <div>
          <LocationCoordinate className="mt-5" />
        </div>

        <div className="mb-5">
          <RecommendationMenu />
        </div>

        <div className="mt-5">
          <MenuAndOrder
            className="mt-5"
            refreshAction={this.state.newZero}
            setRefresh={() => {
              this.setState({
                newZero: null
              });
            }}
            refreshUI={this.state.new_name_price}
            // setRefreshUI={() => {
            //   this.setState({
            //     new_name_price: null
            //   });
            // }}
            hideOrderButton={this.state.new_order_button}
          />
        </div>
      </div>
    );
  }
}

export default App;
