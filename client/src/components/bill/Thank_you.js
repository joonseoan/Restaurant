import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";

class ThankYou extends Component {
  state = {
    reset: false
  };

  handleReset = e => {
    this.setState({ reset: true });
  };

  render() {
    if (this.state.reset) {
      window.location.reload();
    }

    const waitPerson =
      this.props.fromWhere === "cash" ? (
        <div>
          <h4>Waitor / Waitress is comming soon</h4>
          <img
            className="img img-fluid"
            src="https://media1.tenor.com/images/9330a8b90ab850b26b6d3e6c80f91912/tenor.gif?itemid=5676061"
            alt="waitress"
          />
        </div>
      ) : null;

    return (
      <div className="mt-3">
        <Modal
          className="text-center"
          show={this.props.showThankYou}
          style={{ top: "10%" }}
        >
          <Modal.Body>
            {waitPerson}
            <h3 className="text-info blink">Thank you for your order!!!</h3>
            <div>
              <h3 className="font-weight-bold font-italic">
                Would you like to join our survey?
              </h3>
              <div className="mt-3">
                <Link
                  className="btn border border-warning mr-5"
                  onClick={this.handleReset}
                  to="/"
                >
                  SKIP
                </Link>
                <Link
                  className="btn btn-primary ml-5"
                  to="/guestbookNewCreated"
                >
                  YES
                </Link>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default ThankYou;
