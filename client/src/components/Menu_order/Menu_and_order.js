import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import MenuList from "./Menu_list";
import Bill from "../Bill/Bill";
import MenuOrders from "./Menu_orders";

class MenuAndOrder extends Component {
  state = {
    showModal: false,
    clicked_name: ""
  };

  handleOpenModal = () => {
    this.setState({
      showModal: true,
      newPage: false
    });

    const removeZeroOrder = this.props.menuOrdered.filter(
      menu => menu.number !== 0
    );
    this.props.setMenuOrdered(removeZeroOrder);
    this.props.setOrderButton("none");
  };

  handleCloseModal = () => {
    this.setState({
      showModal: false
    });

    this.props.setOrderButton("block");
  };

  shouldComponentUpdate(nextState) {
    if (this.state.showModal === nextState.showModal) return false;

    return true;
  }

  render() {
    if (!this.props) return <div />;
    const { menuOrdered, setMenuOrdered, setOrderButton } = this.props;

    if (this.state.newPage)
      return (
        <Redirect
          to="thankyouAndGuestbook"
          menuChecked={this.props.menuOrdered}
        />
      );

    const data = {
      items: menuOrdered,
      toCheckItems: setMenuOrdered,
      orderButton: setOrderButton
    };

    return (
      <div className="container mt-5 mb-5" id="allFoods">
        <h2>MENU & ORDER</h2>

        <div className="mt-5">
          <MenuList
            controlData={data}
            refreshAction={this.props.refreshAction}
            setRefresh={this.props.setRefresh}
            selectedMenu={this.props.selectedMenu}
            setCountIsZero={this.props.setCountIsZero}
          />

          <MenuOrders
            id="order"
            openModalControl={this.handleOpenModal}
            orderButton={this.props.orderButton}
            menuOrdered={menuOrdered}
            // setCurrentSlide={this.props.setCurrentSlide}
            // currentSlideStatus={this.props.currentSlideStatus}
          />

          {/* 
            <div
              className="btn btn-danger mt-3 mx-auto fixed-bottom w-50"
              onClick={this.handleOpenModal}
              style={{ display: `${this.props.orderButton}` }}
              id="order"
            >
              <div className="row">
                {this.handleOrderList(menuOrdered)}
                <div className="col">Place an Order</div>
              </div>
            </div>
          
           */}
        </div>
        <div>
          <Bill
            openStatus={this.state.showModal}
            menuChecked={this.props.menuOrdered}
            newPageStatus={() => {
              this.setState({ newPage: true });
            }}
          >
            <i
              className="btn btn-secondary text-warning fa fa-arrow-left"
              onClick={this.handleCloseModal}
            />
          </Bill>
        </div>
      </div>
    );
  }
}

export default MenuAndOrder;
