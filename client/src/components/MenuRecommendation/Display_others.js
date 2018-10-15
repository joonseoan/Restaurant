import React, { Component } from "react";
import { connect } from "react-redux";
import { selectedReco } from "../../actions/";

class DisplayOthers extends Component {
  state = {
    visibility: "visible",
    clicked_name: ""
  };

  componentDidUpdate(prevProps, prevState) {
    // console.log("component did update");
    // console.log(
    //   "this.state = ",
    //   this.state.clicked_name,
    //   "prevState = ",
    //   prevState.clicked_name,
    //   ", before didUpdate"
    // );

    if (prevState.clicked_name) {
      this.setState({
        clicked_name: "",
        visibility: "visible"
      });
    }

    // console.log(
    //   "this.state = ",
    //   this.state.clicked_name,
    //   "prevState = ",
    //   prevState.clicked_name,
    //   ", after didUpdate"
    // );
  }

  handleRecoMenu = () => {
    const { name } = this.props.menuItems;
    this.props.selectedReco(name);

    // console.log("onclickevent");

    this.setState({
      visibility: "hidden",
      clicked_name: name
    });
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.clicked_name || this.state.clicked_name) return true;

    // must run this because when weather is updated, it will be update, as well,
    //  then, menu 'start' button will reset.
    if (this.props.menuItems.name === nextProps.menuItems.name) return false;

    return true;
  }

  render() {
    const { name, file, price } = this.props.menuItems;
    const src = `../images/${file}`;
    const ids = `#${name}`;

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

        <div
          onClick={this.handleRecoMenu}
          style={{ visibility: `${this.state.visibility}` }}
        >
          <a
            href={ids}
            className="orderStart font-weight-bold border border-info"
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

export default connect(
  null,
  { selectedReco }
)(DisplayOthers);
