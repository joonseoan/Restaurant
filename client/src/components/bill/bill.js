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
  orderList = order => {
    const { name, value, number } = order;

    const unitPrice = parseFloat(value);

    const subTotal = unitPrice * number;

    let orderNumber = this.props.menuChecked.indexOf(order) + 1;

    return (
      <div key={name}>
        <h5>
          <b>
            {orderNumber}. {name}
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
        // className="mx-auto my-auto"
        isOpen={this.props.openStatus}
        style={{
          content: {
            width: "30%",
            margin: "auto",
            backgroundImage: "url(./images/receipt.PNG)"
          }
        }}
      >
        <section className="text-dark mt-5">
          <div>{this.props.children}</div>
          <h4
            className="text-center font-weight-bold mt-5 m  b-5"
            ref={subtitle => subtitle}
          >
            YOUR RECEIPT
          </h4>
          <div className="mt-5">
            {this.props.menuChecked.map(this.orderList)}
          </div>
          <div className="text-right">
            <p>-----------------------</p>
            <p>Total Number of Orders : {this.numberOfOrders()}</p>
            <p>Total Price: ${rounding(this.totalAmount())}</p>
            <p>HST: 15%</p>
            <p className="font-weight-bold">
              Total Payable: ${rounding(this.totalAmount() * 1.15)}
            </p>
          </div>
        </section>
        <button
          className="btn btn-sm btn-danger float-right mt-5"
          type="submit"
          onClick={this.eventClick}
        >
          SUBMIT ORDER
        </button>
      </Modal>
    );
  }
}

export default connect(
  null,
  { storeOrders }
)(Bill);
