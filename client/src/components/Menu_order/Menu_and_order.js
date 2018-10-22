import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash";

import MenuList from "./Menu_list";
import Bill from "../Bill/Bill";
import { fetchItemsCheckedIn } from "../../actions";

class MenuAndOrder extends Component {
  state = {
    showModal: false,
    name_price: [],
    orderButton: "none",
    clicked_name: ""
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.selected_menu !== nextProps.selectedMenu) {
      return {
        clicked_name: nextProps.selectedMenu
      };
    }

    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.refreshUI !== prevProps.refreshUI &&
      this.props.refreshAction !== prevProps.refreshAction
    ) {
      this.setState({
        name_price: this.props.refreshUI,
        orderButton: this.props.hideOrderButton
      });
    }

    // console.log(this.state.name_price);

    if (
      // this.state.name_price.length > 0 &&
      this.state.name_price.length !== prevState.name_price.length
    ) {
      this.props.fetchItemsCheckedIn(this.state.name_price);
    }

    // if (prevState.name_price.length > 0) {
    //   const buttonControl = {
    //     currentOrder: this.state.name_price,
    //     buttonToggling: control => {
    //       this.setState({ orderButton: control });
    //     }
    //   };
    //  this.props.controlOrderButton(buttonControl);
    //}
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log(this.props.selectedMenu, "selectedMenu");

  //   const { name_price } = this.state;

  //   if (
  //     nextProps.selectedMenu &&
  //     nextProps.selectedMenu.name !== this.props.selectedMenu.name
  //   ) {
  //     this.setState({
  //       name_price: [...name_price, nextProps.selectedMenu]
  //     });
  //   }
  // }

  handleOpenModal = () => {
    this.setState({
      showModal: true,
      newPage: false,
      orderButton: "none",
      name_price: this.state.name_price.filter(menu => menu.number !== 0)
    });

    // need to test it if it is necessary
    // initUI(this.state.name_price);
  };

  handleCloseModal = () => {
    this.setState({
      showModal: false,
      orderButton: "block"
    });
  };

  shouldComponentUpdate(nextState) {
    if (this.state.showModal === nextState.showModal) return false;
    if (this.state.orderButton === nextState.orderButton) return false;

    return true;
  }

  render() {
    // console.log(this.state.name_price, "; name_price");

    if (!this.props) return <div />;

    if (this.state.newPage)
      return (
        <Redirect
          to="thankyouAndGuestbook"
          menuChecked={this.state.name_price}
        />
      );

    const data = {
      items: this.state.name_price,
      toCheckItems: menus => {
        this.setState({ name_price: menus });
      },
      orderButton: control => {
        this.setState({ orderButton: control });
      }
    };

    return (
      <div className="container mt-5 mb-5" id="allFoods">
        <h4 className="text-center">Menu & Order</h4>

        <div className="mt-5">
          <div>
            <MenuList
              controlData={data}
              refreshAction={this.props.refreshAction}
              setRefresh={this.props.setRefresh}
              selectedMenu={this.state.clicked_name}
            />
          </div>
          <div
            className="btn btn-danger mt-3 mx-auto fixed-bottom w-50"
            onClick={this.handleOpenModal}
            style={{ display: `${this.state.orderButton}` }}
            id="order"
          >
            Place an Order
          </div>
        </div>

        <Bill
          openStatus={this.state.showModal}
          menuChecked={this.state.name_price}
          newPageStatus={() => {
            this.setState({ newPage: true });
          }}
        >
          <div className="btn btn-primary" onClick={this.handleCloseModal}>
            Back to Menu
          </div>
        </Bill>
      </div>
    );
  }
}

function mapStateToProps({ selectedMenu }) {
  return { selectedMenu };
}

// export default connect(mapStateToProps)(MenuAndOrder);

export default connect(
  mapStateToProps,
  { fetchItemsCheckedIn }
)(MenuAndOrder);
