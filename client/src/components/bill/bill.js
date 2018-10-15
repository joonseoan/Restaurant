import React, { Component } from "react";
import Modal from "react-modal";
import _ from "lodash";
import { connect } from "react-redux";
import { storeOrders } from "../../actions";

Modal.setAppElement("#root");

function rounding(number) {
  return _.round(number, 2);
}

class Bill extends Component {
  orderList(order) {
    const { name, value, number } = order;

    const unitPrice = parseFloat(value);

    const subTotal = unitPrice * number;

    let orderNumber = this.props.menuChecked.indexOf(order) + 1;

    return (
      <ul key={name}>
        <h5>
          <b>
            {orderNumber}. {name}
          </b>
        </h5>

        <li>Unit Price : ${unitPrice}</li>
        <br />
        <li>Qty : {number} </li>
        <br />
        <li> Sub Total : ${rounding(subTotal)}</li>
        <br />
      </ul>
    );
  }

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

  eventClick = e => {
    // will send this data to DB later on.
    const { menuChecked } = this.props;

    this.props.storeOrders(menuChecked);

    // From children object
    //this.props.children._self.state.newPage = true;
    this.props.newPageStatus();

    // this.props.children._self.handleCloseModal();
  };

  render() {
    if (!this.props) return <div>Loading...</div>;

    // if(this.props.menuChecked.length === 0) {

    //     return (

    //         <Modal isOpen = { this.props.openStatus }>

    //             <div>
    //                 <center>
    //                     <div>

    //                     <h3>Sorry, customer.</h3>
    //                     <h3>You have not chosen the menu yet.</h3>

    //                     </div>

    //                     <div>

    //                             { this.props.children }

    //                     </div>
    //                 </center>

    //             </div>

    //         </Modal>

    //     );

    // }

    return (
      <Modal
        className="bg-warning"
        isOpen={this.props.openStatus}
        style={{
          content: {
            width: "40%",
            margin: "auto"
          }
        }}
      >
        <section>
          <div>{this.props.children}</div>

          <h5 ref={subtitle => subtitle}>
            <center>Your Reciet Estimated</center>
          </h5>

          <div>{this.props.menuChecked.map(this.orderList.bind(this))}</div>

          <div className="right">
            <p>----------------------------------------</p>

            <p>Total number of Orders : {this.numberOfOrders()}</p>
            <p>Total price: ${rounding(this.totalAmount())}</p>
            <p>HST: 15%</p>
            <p>Total Payable: ${rounding(this.totalAmount() * 1.15)}</p>

            <button
              type="submit"
              value="Submit Your Orders"
              onClick={this.eventClick}
            >
              Submit Order
            </button>
          </div>
        </section>
      </Modal>
    );
  }
}

export default connect(
  null,
  { storeOrders }
)(Bill);
