import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";

import { setCurrentMenu } from "../../utils/setRecommendation";
import {
  fetchRecommendedMenus,
  //resetRecoButton,
  selectedReco
} from "../../actions";
import DisplayDetailButtons from "./Display_detail_buttons";
import DisplayOthers from "./Display_others";
import { removeSpace } from "../../utils/uIControl";

class RecommendedMenu extends Component {
  state = {
    selectedMenu: [],
    clicked_name: "",
    updateString: ""
  };

  componentDidMount() {
    if (!this.props) return;

    let updateString = "";

    _.each(setCurrentMenu(this.props), items => {
      updateString += items.name;
    });

    this.setState({
      selectedMenu: setCurrentMenu(this.props),
      updateString
    });

    // const reset = { reset: () => this.setState({ clicked_name: "" }) };
    // this.props.resetRecoButton(reset);
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.temp !== nextProps.temp ||
      this.props.value !== nextProps.value
    ) {
      this.setState({
        selectedMenu: setCurrentMenu(nextProps)
      });

      this.props.fetchRecommendedMenus(setCurrentMenu(nextProps));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.clicked_name !== this.state.clicked_name) {
      this.props.selectedReco(this.state.clicked_name);
    }

    if (prevState.updateString !== this.state.updateString) {
      this.setState({ updateString: this.state.updateString });
    }
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (
  //     this.props.temp === nextProps.temp &&
  //     this.props.value === nextProps.value
  //   )
  //     return false;

  //   return true;
  // }

  handleOrders() {
    const { selectedMenu } = this.state;
    const { itemsCheckedIn } = this.props;

    let setMenu = selectedMenu;

    console.log(itemsCheckedIn, "itemsCheckedIn");
    console.log(setMenu, ": SETMENU");

    if (itemsCheckedIn.length > 0) {
      _.each(setMenu, menu => {
        _.each(itemsCheckedIn, item => {
          if (removeSpace(menu.name) === item.name) {
            menu["number"] = item.number;
          } else {
            if (!menu.number) menu["number"] = null;
          }
        });
      });
    }

    return setMenu;
  }

  render() {
    const { selectedMenu } = this.state;

    if (selectedMenu.length === 0) return <div />;

    console.log(this.props.canceledMenu, ": canceledMenu");

    // const control = {
    //   // resetClickedMenu: () => {
    //   //   this.setState({ clicked_name: "" });
    //   // },
    //   getClickedMenu: menu => {
    //     this.setState({ clicked_name: menu });
    //   }
    //   // currentClickedMenu: this.state.clicked_name
    // };

    return (
      <div className="row border border-danger">
        {_.map(this.handleOrders(), menu => {
          const { name, id, price, file, number } = menu;

          return (
            <div
              key={id}
              className="col border border-warning rounded mx-2 pb-5"
            >
              <div className="mb-2 bg-warning">{name} </div>

              <DisplayDetailButtons namePrice={{ name, price }} />
              <DisplayOthers
                menuItems={{ name, file, price, number }}
                clickeMenuControl={menu => {
                  this.setState({ clicked_name: menu });
                }}
                updateString={this.state.updateString}
                // itemsCheckedIn={this.props.itemsCheckedIn}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

function mapStateToProps({ itemsCheckedIn, canceledMenu }) {
  return {
    itemsCheckedIn,
    canceledMenu
  };
}

export default connect(
  mapStateToProps,
  { fetchRecommendedMenus, selectedReco }
)(RecommendedMenu);
