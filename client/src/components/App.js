import React, { Component } from "react";
import WOW from "wow.js";
import { connect } from "react-redux";
import _ from "lodash";

import BranchList from "./Branch/Branch_list";
import LocationCoordinate from "./Weather/Location_coordinate";
import RecommendationMenu from "./MenuRecommendation/Recommendation_menu";
import MenuAndOrder from "./Menu_order/Menu_and_order";
//import { setLocation } from "../actions/index";
//import { options } from "../utils/cities";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newZero: null,
      menu_ordered: [],
      orderButton: "none",
      count: 0,
      isZero: false
      // forcedRefresh: true
      // city: ""
    };

    //this._isMounted = false;
    // need to make a decision to refresh policy
    // if (this.state.forcedRefresh) sessionStorage.clear();
  }

  componentDidMount = () => {
    // this.props.location(this.state.city);

    // const city = sessionStorage.branch_city || options[0].value;

    // this.setState({
    //   city
    // });

    // this.props.setLocation(city);

    if (typeof window !== "undefined") {
      const wow = new WOW();
      wow.init();
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const { menu_ordered, count, isZero } = this.state;
    if (this._isMounted) {
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
    }
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
            // city={this.state.city}
            // setCity={city => {
            //   this.setState({ city: city });
            // }}
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
            // need to make a decision for refresh policy
            // isForcedRefresh={() => {
            //   this.setState({ forcedRefresh: false });
            // }}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps({ selectedMenu }) {
  return { selectedMenu };
}

export default connect(mapStateToProps)(App); //{ setLocation }
