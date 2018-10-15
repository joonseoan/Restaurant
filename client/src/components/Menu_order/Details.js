import React, { Component } from "react";
import MainDescriptions from "../Current_recommendations/Main_descriptions";
import { Modal } from "react-bootstrap";

class Details extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      name: "",
      price: 0,
      showModal: false
    };
  }

  handleDetailButton = e => {
    this.setState({
      name: e.target.name,
      price: e.target.value,
      showModal: true
    });
  };

  handleModalClose = e => {
    this.setState({
      showModal: false
    });
  };
  render() {
    const { name, price } = this.props.namePrice;

    return (
      <div className="mt-3">
        <button
          className="btn btn-sm btn-info"
          onClick={this.handleDetailButton}
          value={price}
          name={name}
        >
          Check Detail
        </button>

        <Modal
          className="text-center"
          show={this.state.showModal}
          onHide={this.handleModalClose}
        >
          <Modal.Header>
            <Modal.Title className="clearfix">
              <span className="mr-auto display-4">
                {name}
                ($
                {price})
              </span>
            </Modal.Title>
            <span
              className="btn btn-sm btn-danger ml-auto"
              onClick={this.handleModalClose}
            >
              X
            </span>
          </Modal.Header>
          <Modal.Body>
            <MainDescriptions foodName={name} />
          </Modal.Body>
          <Modal.Footer>
            <div
              className="btn btn-sm btn-danger"
              onClick={this.handleModalClose}
            >
              Close
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Details;
