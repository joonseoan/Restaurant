import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";

import { setCurrentMenu } from "../../utils/setRecommendation";
import { fetchRecommendedMenus, selectedReco } from "../../actions";
import DisplayDetailButtons from "./Display_detail_buttons";
import DisplayOthers from "./Display_others";
import { removeSpace } from "../../utils/uIControl";

class RecommendedMenu extends Component {
  state = {
    selectedMenu: [],
    clicked_name: "",
    updateString: "",
    canceled_menu: ""
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

    this.setState({ canceled_menu: nextProps.canceledMenu });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.clicked_name !== this.state.clicked_name) {
      this.props.selectedReco(this.state.clicked_name);
    }

    if (prevState.updateString !== this.state.updateString) {
      this.setState({ updateString: this.state.updateString });
    }

    if (
      this.state.clicked_name &&
      prevState.clicked_name === this.state.clicked_name
    ) {
      this.setState({ clicked_name: "" });
    }

    if (
      this.state.canceled_menu &&
      this.props.canceledMenu === prevState.canceled_menu
    ) {
      this.setState({ canceled_menu: "" });
    }
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   // if (
  //   //   this.props.temp === nextProps.temp &&
  //   //   this.props.value === nextProps.value
  //   // )
  //   //   return false;

  //   return true;
  // }

  handleOrders() {
    const { selectedMenu } = this.state;
    const { menuOrdered } = this.props;

    let setMenu = selectedMenu;
    _.each(setMenu, menu => {
      menu.number = null;
    });

    if (menuOrdered.length > 0) {
      _.each(setMenu, menu => {
        _.each(menuOrdered, item => {
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

    return (
      <div className="row mx-5">
        {_.map(this.handleOrders(), menu => {
          const { name, id, price, file, number } = menu;
          return (
            <div key={id} className="col specials mx-2 pb-5 wow bounceInUp">
              <p className="current-specials text-warning">Current Specials</p>
              <div className="mb-2 text-white font-weight-bold">{name}</div>

              <DisplayDetailButtons namePrice={{ name, price }} />
              <DisplayOthers
                menuItems={{ name, file, price, number }}
                clickeMenuControl={menu => {
                  this.setState({ clicked_name: menu });
                }}
                updateString={this.state.updateString}
                canceledMenu={this.state.canceled_menu}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

function mapsPropsToState({ canceledMenu }) {
  return { canceledMenu };
}

export default connect(
  mapsPropsToState,
  { fetchRecommendedMenus, selectedReco }
)(RecommendedMenu);
