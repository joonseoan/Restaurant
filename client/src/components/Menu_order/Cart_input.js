import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";

import { removeSpace } from "../../utils/uIControl";

class CartInput extends Component {
  state = {
    setMenu: ""
  };

  static getDerivedStateFromProps(nextProps, prevState) {}

  componentDidUpdate(prevProps, prevNext) {
    const {
      items,
      toCheckItems,
      orderButton
    } = this.props.controlFunction.dataControl;
    const {
      name,
      price
    } = this.props.controlFunction.menuColorControl.menuItems;

    const { selectedMenu } = this.props;

    if (selectedMenu !== prevProps.selectedMenu) {
      if (name === selectedMenu) {
        orderButton("none");

        if (items.length > 0) {
          const cleanCart = _.map(items, orders => {
            if (orders.number === 0) {
              const index = items.indexOf(orders);
              return items.splice(index, 1);
            }
          });
          toCheckItems(cleanCart);
        }

        const newItems = [
          ...items,
          {
            name: removeSpace(selectedMenu),
            value: price,
            checked: true,
            number: 0
          }
        ];

        toCheckItems(newItems);
      }
    }
  }

  menuOnChange = e => {
    const { name, value, checked } = e.target;
    const {
      items,
      toCheckItems,
      orderButton
    } = this.props.controlFunction.dataControl;

    orderButton("none");

    if (items.length > 0) {
      const cleanCart = _.map(items, orders => {
        if (orders.number === 0) {
          const index = items.indexOf(orders);
          return items.splice(index, 1);
        }
      });
      toCheckItems(cleanCart);
    }

    const newItems = [...items, { name, value, checked, number: 0 }];

    toCheckItems(newItems);
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.selectedMenu === nextProps.selectedMenu) return false;

    return true;
  }

  render() {
    if (!this.props) return <div />;

    const {
      name,
      price
    } = this.props.controlFunction.menuColorControl.menuItems;

    console.log(this.state.setMenu, "setMenu");

    const { items } = this.props.controlFunction.dataControl;

    let visibility = "visible";
    let disabled = false;
    let checked = false;

    _.each(items, item => {
      if (item.name === removeSpace(name)) {
        visibility = "hidden";
        disabled = true;
        checked = false;
      }
    });

    return (
      <div className="icons">
        <i
          className="fa fa-cart-arrow-down text-danger float-right"
          id={removeSpace(name)}
          style={{ fontSize: "24px", visibility: `${visibility}` }}
        >
          <input
            type="checkbox"
            name={removeSpace(name)}
            className={`${removeSpace(name)} ml-1`}
            value={price}
            onChange={this.menuOnChange}
            disabled={disabled}
            checked={checked}
          />
        </i>
      </div>
    );
  }
}

function mapStateToProps({ selectedMenu }) {
  return {
    selectedMenu
  };
}

export default connect(mapStateToProps)(CartInput);
