import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";

import { removeSpace, initUI } from "../../utils/uIControl";
import { fetchCancelMenu } from "../../actions";

class Orders extends Component {
  buttons = [1, 2, 3, 4];

  state = {
    number: 0
  };

  // componentDidMount() {
  //   const { items } = this.props.cartAndButton.items;
  //   this.props.fetchItemsCheckedIn(items);
  // }

  componentDidUpdate(prevProps, prevState) {
    // const {
    //   items: { items }
    // } = this.props.cartAndButton;
    // const { items } = this.props.cartAndButton.items;

    if (prevProps.refreshAction !== this.props.refreshAction) {
      //if(prevProps.refreshAction !== prevState.number ) {

      this.setState({ number: prevProps.refreshAction });

      this.props.setRefresh();
    }

    // if (this.state.number !== prevState.number) {
    //   this.props.fetchItemsCheckedIn(items);
    // }
  }

  numberOnChange = e => {
    const { items, orderButton } = this.props.cartAndButton.items;

    const CurrentMenuName = e.target.id;

    let buttonValues;

    if (e.target.value !== "+") {
      buttonValues = Number(e.target.value);

      this.setState({
        number: buttonValues
      });

      if (buttonValues === 0) {
        items.forEach(menu => {
          if (menu.name === CurrentMenuName) {
            const index = items.indexOf(menu);

            items.splice(index, 1);
          }
        });

        initUI(CurrentMenuName);
        this.props.fetchCancelMenu(CurrentMenuName);
      }
    } else {
      buttonValues = this.state.number + 1;

      this.setState({
        number: buttonValues
      });
    }

    _.each(items, item => {
      if (CurrentMenuName === item.name) {
        item["number"] = buttonValues;
      }
    });

    if (items.length > 0) {
      let count;

      items.forEach(order => {
        count = +order.number;
      });

      if (count > 0) {
        orderButton("block");
      }
    } else {
      orderButton("none");
    }
  };

  buttonDisplay = () => {
    const { name } = this.props.cartAndButton;

    return this.buttons.map(button => {
      const visibility =
        Number(button) === this.state.number ? "hidden" : "visible";

      return (
        <button
          key={button}
          className="btn btn-sm mr-1 mb-1"
          style={{
            backgroundColor: "#ff4444",
            color: "white",
            visibility: `${visibility}`
          }}
          value={button}
          onClick={this.numberOnChange}
          id={removeSpace(name)}
        >
          {button}
        </button>
      );
    });
  };

  // shouldComponentUpdate(nextState) {
  //   if (this.state.number === nextState.number) return false;

  //   return true;
  // }

  render() {
    if (!this.props) return <div />;

    const {
      name,
      items: { items }
    } = this.props.cartAndButton;

    const className = `${removeSpace(name)}Button`;

    let display = "none";

    _.each(items, item => {
      if (removeSpace(name) === item.name) display = "block";
    });

    return (
      <div>
        <div
          className={className}
          style={{ display: `${display}` }}
          id="number-input"
        >
          {/* */}
          <div className="mt-3">
            Number of Orders:{" "}
            <label className={removeSpace(name)}>{this.state.number}</label>
          </div>

          <div className="btn-group mt-3">
            <button
              className="btn btn-sm mr-1 mb-1 btn-primary"
              onClick={this.numberOnChange}
              value={0}
              id={removeSpace(name)}
            >
              0
            </button>

            {this.buttonDisplay()}

            <button
              className="btn btn-sm mr-1 mb-1"
              style={{ backgroundColor: "#CC0000", color: "white" }}
              onClick={this.numberOnChange}
              value={"+"}
              id={removeSpace(name)}
            >
              +
            </button>
          </div>
        </div>
      </div>
    );
  }
}

// export default Orders;

export default connect(
  null,
  { fetchCancelMenu }
)(Orders);
