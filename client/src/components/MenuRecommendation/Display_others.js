import React, { Component } from "react";
import { connect } from "react-redux";
import { selectedReco } from "../../actions/";
import _ from "lodash";

class DisplayOthers extends Component {
  menuName;
  receivedMenu;

  // state = { tag: true };

  handleRecoMenu = () => {
    const { name } = this.props.menuItems;
    const { currentOrder, buttonToggling } = this.props.controlOrderButton;
    this.menuName = name;
    // this.setState({ tag: true });
    this.props.selectedReco(name);

    console.log(this.props.controlOrderButton, "currentOrder");

    if (this.props.controlOrderButton !== {}) {
      let number = false;
      _.each(currentOrder, orderNumber => {
        if (orderNumber.number === 0) number = true;
      });

      const toggling = !number ? "block" : "none";
      buttonToggling(toggling);

      console.log(number);
    }
  };

  render() {
    const {
      menuItems: { name, file, price },
      matchedMenu
    } = this.props;
    const src = `../images/${file}`;
    const ids = `#${name}`;

    let visibility = "visible";

    // if (this.menuName === name) {
    //   visibility = "hidden";
    //   console.log(matchedMenu, "matched"); // this.props.matchedMenu = "";
    // } else if (matchedMenu === name) {
    //   visibility = "hidden";
    // }

    this.menuName = "";
    this.receivedMenu = "";

    return (
      <div className="border border-success">
        <div>
          <img
            style={{ width: "220px", height: "150px" }}
            className="img img-fluid img-thumbnail mt-3"
            alt="Responsive_img"
            src={src}
          />
        </div>

        <div className="text-info mb-1"> Price: ${price} </div>

        <div style={{ visibility: `${visibility}` }}>
          <a
            href={ids}
            className="orderStart font-weight-bold border border-info"
            onClick={this.handleRecoMenu}
          >
            <span data-text="S">S</span>
            <span data-text="T">T</span>
            <span data-text="A">A</span>
            <span data-text="R">R</span>
            <span data-text="T" className="pr-2">
              T
            </span>
            <span data-text="O">O</span>
            <span data-text="R">R</span>
            <span data-text="D">D</span>
            <span data-text="E">E</span>
            <span data-text="R">R</span>
          </a>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ matchedMenu, controlOrderButton }) {
  return {
    matchedMenu,
    controlOrderButton
  };
}

export default connect(
  mapStateToProps,
  { selectedReco }
)(DisplayOthers);
