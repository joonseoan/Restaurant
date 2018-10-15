import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";

import { removeSpace } from "../../utils/uIControl";

class CartInput extends Component {
  componentDidUpdate(prevProps, prevNext) {
    console.log(prevProps.selectedMenu, 'selectedMenu ""');

    const {
      items,
      toCheckItems,
      orderButton
    } = this.props.controlFunction.dataControl;

    const {
      name,
      price
    } = this.props.controlFunction.menuColorControl.menuItems;

    if (
      this.props.selectedMenu &&
      this.props.selectedMenu !== prevProps.selectedMenu
    ) {
      if (name === this.props.selectedMenu) {
        orderButton("none");

        if (items.length > 0) {
          const cleanCart = _.each(items, orders => {
            if (orders.number === 0) {
              const index = items.indexOf(orders);

              return items.splice(index, 1);
            }
          });

          toCheckItems(cleanCart);
        }

        const newItems = [
          ...items,
          { name, value: price, checked: true, number: 0 }
        ];

        toCheckItems(newItems);
      }
      // console.log(this.props.selectedMenu, ":: selectedMenu");
      // this.setState({
      //   name_price: [...name_price, this.props.selectedMenu]
      // });
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
      const cleanCart = _.each(items, orders => {
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
    if (this.props.selectedMenu.name === nextProps.selectedMenu.name)
      return false;

    return true;
  }

  render() {
    if (!this.props) return <div />;

    const {
      name,
      price
    } = this.props.controlFunction.menuColorControl.menuItems;

    console.log(name, ":: name");

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
