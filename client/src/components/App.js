import React, { Component } from "react";
import WOW from "wow.js";
import { connect } from "react-redux";
import _ from "lodash";

import BranchList from "./Branch/Branch_list";
import LocationCoordinate from "./Weather/Location_coordinate";
import RecommendationMenu from "./MenuRecommendation/Recommendation_menu";
import MenuAndOrder from "./Menu_order/Menu_and_order";

class App extends Component {
  state = {
    newZero: null,
    menu_ordered: [],
    orderButton: "none",
    count: 0,
    isZero: false
    //currentSlide: 0
  };

  componentDidMount = () => {
    sessionStorage.clear();

    if (typeof window !== "undefined") {
      const wow = new WOW();
      wow.init();
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const { menu_ordered, count, isZero } = this.state;

    if (
      count !== prevState.count ||
      isZero !== prevState.isZero ||
      menu_ordered.length !== prevState.menu_ordered.length
    ) {
      let counter = 0;
      _.each(menu_ordered, menu => {
        if (menu.number === 0) this.setState({ isZero: true });

        counter += menu.number;
      });

      this.setState({ count: counter });

      if (menu_ordered.length > 0) {
        if (!isZero && count > 0) {
          this.setState({ orderButton: "block" });
        } else if (isZero && count > 0) {
          this.setState({ orderButton: "none" });
        } else if (isZero) {
          this.setState({ orderButton: "none" });
        }
      } else {
        this.setState({ orderButton: "none" });
      }
    }

    // if (
    //   prevState.orderButton === "block" &&
    //   this.state.orderButton === "none"
    // ) {
    //   this.setState({ currentSlide: 0 });
    // }
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.state.newZero !== nextState.newZero) return true;

  //   return true;
  // }

  render() {
    return (
      <div>
        <div className="mt-5">
          <BranchList
            refreshStatus={() => {
              this.setState({
                newZero: 0,
                menu_ordered: [],
                orderButton: "none"
              });
            }}
          />
        </div>

        <div>
          <LocationCoordinate className="mt-5" />
        </div>

        <div className="mb-5">
          <RecommendationMenu
            menuOrdered={this.state.menu_ordered}
            newZeroStatus={this.state.newZero}
          />
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
            setMenuOrdered={menu => {
              this.setState({ menu_ordered: menu });
            }}
            menuOrdered={this.state.menu_ordered}
            setOrderButton={button => {
              this.setState({ orderButton: button });
            }}
            orderButton={this.state.orderButton}
            selectedMenu={this.props.selectedMenu}
            setCountIsZero={{
              setCount: number => {
                this.setState({ count: number });
              },
              setIsZero: status => {
                this.setState({ isZero: status });
              }
            }}
            // setCurrentSlide={number => {
            //   this.setState({ currentSlide: number });
            // }}
            // currentSlideStatus={this.state.currentSlide}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps({ selectedMenu }) {
  return { selectedMenu };
}

export default connect(mapStateToProps)(App);
