import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";

import { setCurrentMenu } from "../../utils/setRecommendation";
import { fetchRecommendedMenus } from "../../actions";
import DisplayDetailButtons from "../../utils/display_detail_buttons";
import DisplayOthers from "./Display_others";

class RecommendedMenu extends Component {
  state = {
    selectedMenu: [],
    toDescriptionName: "",
    toDescriptionPrice: 0
  };

  componentDidMount() {
    if (!this.props) return;

    this.setState({
      selectedMenu: setCurrentMenu(this.props)
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
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (
  //     this.props.temp === nextProps.temp &&
  //     this.props.value === nextProps.value
  //   )
  //     return false;

  //   return true;
  // }

  render() {
    const { selectedMenu } = this.state;

    if (selectedMenu.length === 0) return <div />;

    return (
      <div className="row border border-danger">
        {_.map(selectedMenu, menu => {
          const { name, id, price, file } = menu;

          return (
            <div
              key={id}
              className="col border border-warning rounded mx-2 pb-5"
            >
              <div className="mb-2 bg-warning">{name} </div>

              <DisplayDetailButtons
                menuItems={{ name, price }}
                clickedMenu={(nameSent, priceSent) => {
                  this.setState({
                    toDescriptionName: nameSent,
                    toDescriptionPrice: priceSent
                  });
                }}
                descriptionNamePrice={{
                  name: this.state.toDescriptionName,
                  price: this.state.toDescriptionPrice
                }}
              />
              <DisplayOthers menuItems={{ name, file, price }} />
            </div>
          );
        })}
      </div>
    );
  }
}

export default connect(
  null,
  { fetchRecommendedMenus }
)(RecommendedMenu);
