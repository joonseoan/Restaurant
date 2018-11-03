import React, { Component } from "react";
import { removeSpace } from "../../utils/uIControl";

class DisplayOthers extends Component {
  handleRecoMenu = () => {
    const {
      menuItems: { name },
      clickeMenuControl
    } = this.props;

    clickeMenuControl(name);
  };

  // shouldComponentUpdate(nextProps, nextState) {
  //   const {
  //     updateString,
  //     clickeMenuControl: { currentClickedMenu }
  //   } = this.props;

  //   if (nextProps.currentClickedMenu !== currentClickedMenu) return true;
  //   if (nextProps.updateString === updateString) return false;

  //   return true;
  // }

  handleStartOrderButton() {
    const {
      menuItems: { name, number },
      canceledMenu
    } = this.props;

    const ids = `#${name}`;

    const startOrder = (
      <div key={name} onClick={this.handleRecoMenu}>
        <a
          href={ids}
          className="orderStart font-weight-bold border border-info rounded"
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
    );

    if (number === 0) {
      return <div>ENTER A NUMBER OF ORDERS</div>;
    } else if (number > 0) {
      return <div>READY TO ORDER</div>;
    } else if (removeSpace(name) === canceledMenu) {
      return startOrder;
    } else {
      return startOrder;
    }
  }

  render() {
    const {
      menuItems: { file, price }
    } = this.props;
    const src = `../images/${file}`;

    return (
      <div>
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
        </div>
        {this.handleStartOrderButton()}
      </div>
    );
  }
}

export default DisplayOthers;
