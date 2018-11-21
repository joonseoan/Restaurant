import React, { Component } from "react";
import Modal from "react-modal";
import _ from "lodash";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { storeOrders } from "../../actions";
import { rounding, insertSpaces } from "../../utils/uIControl";
import CreditCard from "./Credit_card";

Modal.setAppElement("#root");

class Bill extends Component {
  state = {
    tipRate: 0,
    tip: 0,
    showThankYou: false
  };

  orderList = order => {
    const { name, value, number } = order;
    const unitPrice = parseFloat(value);
    const subTotal = unitPrice * number;
    let orderNumber = this.props.menuChecked.indexOf(order) + 1;

    return (
      <div key={name}>
        <h5>
          <b>
            {orderNumber}. {insertSpaces(name)}
          </b>
        </h5>
        <div className="text-right">
          <div>Unit Price : ${unitPrice}</div>
          <div>Qty : {number} </div>
          <div>Sub Total : ${rounding(subTotal)}</div>
        </div>
      </div>
    );
  };

  numberOfOrders() {
    let totalOrders = 0;

    _.each(this.props.menuChecked, order => {
      totalOrders += order.number;
    });

    return totalOrders;
  }

  totalAmount() {
    let totalAmount = 0;
    let subTotalAmount = 0;

    _.each(this.props.menuChecked, order => {
      subTotalAmount = order.value * order.number;
      totalAmount += subTotalAmount;
    });

    return totalAmount;
  }

  handleOnChange = e => {
    this.setState({
      tipRate: e.target.value,
      tip: rounding(e.target.value * this.totalAmount())
    });
  };

  eventClick = () => {
    // will send this data to DB later on.

    const { menuChecked } = this.props;
    this.props.storeOrders(menuChecked);
    // this.props.children._self.handleCloseModal();
  };

  render() {
    if (!this.props) return <div>Loading...</div>;

    const tipRate = [0.0, 0.1, 0.15, 0.2];
    let count = 0;

    return (
      <Modal
        isOpen={this.props.openStatus}
        style={{
          content: {
            width: "50%",
            margin: "auto",
            backgroundImage: "url(./images/receipt.PNG)"
          }
        }}
      >
        <section className="text-monospace">
          <div>{this.props.children}</div>
          <h4
            className="text-center font-weight-bold"
            ref={subtitle => subtitle}
          >
            YOUR RECEIPT (ESTIMATED)
          </h4>
          <div className="mt-5">
            {this.props.menuChecked.map(this.orderList)}
          </div>
          <div className="text-right">
            <p>----------------------</p>
            <p>Total Number of Orders : {this.numberOfOrders()}</p>
            <p>Total Price : ${rounding(this.totalAmount())}</p>
            <p>HST(15%) : ${rounding(this.totalAmount() * 0.15)}</p>
            <div className="text-center border-top border-bottom">
              <p className="text-dark font-weight-bold mt-3">
                Would you like to tip?
              </p>
              {_.map(tipRate, rate => {
                count++;
                return (
                  <div
                    key={count}
                    className="custom-control custom-radio custom-control-inline"
                  >
                    <input
                      type="radio"
                      className="custom-control-input"
                      id={`tip-${count}`}
                      name="tip"
                      value={rate}
                      onChange={this.handleOnChange}
                      defaultChecked={rate === 0.0 ? true : false}
                    />
                    <label
                      className="custom-control-label font-weight-normal"
                      htmlFor={`tip-${count}`}
                    >
                      {rate * 100}%
                    </label>
                  </div>
                );
              })}
              <p className="text-right mt-3">
                Tip ($
                {rounding(this.totalAmount())} X {this.state.tipRate * 100}
                %) : ${this.state.tip}
              </p>
            </div>
            <p className="font-weight-bold mt-4 font-italic">
              Total Payable : $
              {rounding(this.state.tip + this.totalAmount() * 1.15)}
            </p>
          </div>
        </section>
        <div className="mt-5 text-center">
          <h5
            className="text-monospace font-weight-bold mt-2 text-danger"
            style={{ textDecoration: "underline" }}
          >
            CHECK OUT
          </h5>
          <ol className="list-unstyled text-monospace bg-transparent justify-content-center">
            <li className="d-inline">
              <Link
                className="btn btn-sm btn-warning font-weight-bold text-secondary"
                onClick={this.eventClick}
                to={{ pathname: "/background", state: "cash" }}
              >
                CASH
                <i className="ml-2 fa fa-dollar" />
              </Link>{" "}
            </li>
            <li className="d-inline">
              <CreditCard
                totalPayment={rounding(
                  this.state.tip + this.totalAmount() * 1.15
                )}
                storeMenuOrders={() => {
                  const { menuChecked, storeOrders } = this.props;
                  storeOrders(menuChecked);
                }}
              />
            </li>
          </ol>
        </div>
      </Modal>
    );
  }
}

export default connect(
  null,
  { storeOrders }
)(Bill);
