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
        <a href={ids} className="orderStart">
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
      return <div className="text-secondary">ENTER A NUMBER OF ORDERS</div>;
    } else if (number > 0) {
      return <div className="text-secondary">READY TO ORDER</div>;
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
        <div>
          <div>
            <img
              style={{ width: "150px", height: "100px" }}
              className="img img-fluid img-thumbnail mt-3"
              alt="Responsive_img"
              src={src}
            />
          </div>
          <div className="text-success mb-1"> Price: ${price} </div>
        </div>
        {this.handleStartOrderButton()}
      </div>
    );
  }
}

export default DisplayOthers;
